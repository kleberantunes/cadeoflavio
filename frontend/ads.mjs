// Google H5 Games Ad Placement API. Developed by AK Labs.
// A missing account, blocked SDK or empty inventory must never lock the game.
export function createGameAds(config,{win=globalThis.window,doc=globalThis.document,schedule=setTimeout,cancel=clearTimeout}={}){
  let readiness,pending,requested=false;
  const enabled=()=>config.enabled===true&&/^ca-pub-\d{16}$/.test(config.publisherId||'')&&
    (!config.testMode||['localhost','127.0.0.1','[::1]'].includes(win?.location?.hostname));

  function prepare(){
    if(!enabled())return Promise.resolve(false);
    if(readiness)return readiness;
    readiness=new Promise(resolve=>{
      let settled=false;
      const finish=ready=>{if(settled)return;settled=true;cancel(timer);resolve(ready);};
      const timer=schedule(()=>finish(false),5000);
      try{
        win.adsbygoogle=win.adsbygoogle||[];
        win.adBreak=win.adConfig=options=>win.adsbygoogle.push(options);
        const script=doc.createElement('script');
        script.async=true;script.crossOrigin='anonymous';
        script.src=`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.publisherId}`;
        script.dataset.adClient=config.publisherId;
        script.dataset.adFrequencyHint='120s';
        if(config.testMode)script.dataset.adbreakTest='on';
        script.onerror=()=>finish(false);
        win.adConfig({preloadAdBreaks:'on',sound:'off',onReady:()=>finish(true)});
        doc.head.append(script);
      }catch{finish(false);}
    });
    return readiness;
  }

  function beforeGame({sound=false,isCurrent=()=>true,beforeAd=()=>{},afterAd=()=>{}}={}){
    if(pending)return pending;
    if(!enabled())return Promise.resolve({status:'disabled'});
    if(requested)return Promise.resolve({status:'already-requested'});
    pending=(async()=>{
      if(!await prepare())return {status:'unavailable'};
      if(!isCurrent())return {status:'cancelled'};
      requested=true;
      return new Promise(resolve=>{
        let showing=false,done=false;
        const resume=()=>{if(showing){showing=false;afterAd();}};
        const finish=info=>{if(done)return;done=true;resume();resolve({status:info?.breakStatus||'other'});};
        try{
          win.adConfig({sound:sound?'on':'off'});
          win.adBreak({
            type:'start',name:'before_first_search',
            beforeAd:()=>{if(!showing){showing=true;beforeAd();}},
            afterAd:resume,
            adBreakDone:finish,
          });
        }catch{finish({breakStatus:'error'});}
      });
    })().finally(()=>{pending=null;});
    return pending;
  }
  return {prepare,beforeGame};
}
