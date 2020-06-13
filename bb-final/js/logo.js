function start(){
    var anim;
    var animdata =  {
        container: document.getElementById("logo-anim"),
        renderer: "svg",
        loop: false,
        autoplay: true,
        rendererSettings: {
            progressiveLoad: false,
            preserveAspectRatio: "xMidYMax slice"
          },
        path: "js/logo-anim.json"
    };

anim = bodymovin.loadAnimation(animdata);
}

start();