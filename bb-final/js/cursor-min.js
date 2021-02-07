const math={lerp:(t,s,a)=>(1-a)*t+a*s};class Cursor{constructor(){this.el=document.querySelector("[data-cursor]"),this.stickies=[...document.querySelectorAll("[data-stick-cursor]")],this.data={mouse:{x:0,y:0},current:{x:0,y:0},last:{x:0,y:0},ease:.15,dist:100,fx:{diff:0,acc:0,velo:0,scale:0}},this.bounds={h:0,a:0},this.rAF=null,this.targets=null,this.run=this.run.bind(this),this.mousePos=this.mousePos.bind(this),this.stick=this.stick.bind(this),this.state={stick:!1},this.init()}mousePos(t){this.data.mouse.x=t.pageX,this.data.mouse.y=t.pageY,this.data.current.x=t.pageX,this.data.current.y=t.pageY}getCache(){this.targets=[],this.stickies.forEach(((t,s)=>{const a=t.getBoundingClientRect();this.targets.push({el:t,x:a.left+a.width/2,y:a.top+a.height/2})}))}stick(t){const s={x:t.x-this.data.mouse.x,y:t.y-this.data.mouse.y},a=Math.atan2(s.x,s.y),i=Math.sqrt(s.x*s.x+s.y*s.y);i<this.data.dist&&!this.state.stick?(this.state.stick=!0,this.data.ease=.075,this.data.current.x=t.x-Math.sin(a)*i/2.5,this.data.current.y=t.y-Math.cos(a)*i/2.5,this.el.classList.add("is-active")):this.state.stick?(this.state.stick=!1,this.data.ease=.15):i>this.data.dist&&this.el.classList.remove("is-active")}run(){this.targets.forEach(this.stick),this.data.last.x=math.lerp(this.data.last.x,this.data.current.x,this.data.ease),this.data.last.y=math.lerp(this.data.last.y,this.data.current.y,this.data.ease),this.data.fx.diff=this.data.current.x-this.data.last.x,this.data.fx.acc=this.data.fx.diff/window.innerWidth,this.data.fx.velo=+this.data.fx.acc,this.data.fx.scale=1-Math.abs(5*this.data.fx.velo),this.el.style.transform=`translate3d(${this.data.last.x}px, ${this.data.last.y}px, 0) scale(${this.data.fx.scale})`,this.raf()}raf(){this.rAF=requestAnimationFrame(this.run)}addListeners(){window.addEventListener("mousemove",this.mousePos,{passive:!0})}init(){this.getCache(),this.addListeners(),this.raf()}}const cursor=new Cursor;