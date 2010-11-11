Ext.ns('Ext.ux.touch');
/**
 * @author Shea Frederick - http://www.vinylfox.com
 * @class Ext.ux.touch.SwipeTabs
 * <p>A plugin that lets the user swipe between tabs in a TabPanel. No configuration is needed.</p>
 * <p>Sample Usage</p>
 * <pre><code>
 {
     xtype: 'tabpanel',
     ...,
     plugins: [new Ext.ux.touch.SwipeTabs()],
     ...
 }
 * </code></pre>
 */
Ext.ux.touch.SwipeTabs = Ext.extend(Ext.util.Observable, {
  // private
  init: function(cmp){
    this.cmp = cmp;
    this.setFn = (Ext.versionDetail.major === 0 && Ext.versionDetail.minor <= 9 && Ext.versionDetail.patch < 9) ? 'Card' : 'ActiveItem'; 
    cmp.on('render', this.initSwipeHandlers, this);
  },
  // private
  initSwipeHandlers: function(){
    this.cmp.til = this.cmp.items.length-1;
    this.cmp.items.each(function(itm, i){
      itm.idx = i;
      if (itm.getLayout().type === 'card'){
        itm.on('render', this.initChildSwipeHandlers, this);
      }else{
        itm.on('render', function(){ 
			this.addSwipe(itm, i);
		}, this);
      }
    },this)
  },
  // private
  initChildSwipeHandlers: function(itm){
    var i = itm.idx;
    itm.items.each(function(itm){
      this.addSwipe(itm, i);
    }, this);
  },
  // private
  addSwipe: function(itm, i){
    if (i === 0){
      this.addSwipeLeft(itm, i);
    }else if(i === this.cmp.til){
      this.addSwipeRight(itm, i);
    }else{
      this.addSwipeLeft(itm, i);
      this.addSwipeRight(itm, i);
    }
  },
  // private
  addSwipeLeft: function(itm, i){
    itm.mon(itm.el, 'swipe', function(ev) {
      if (ev.direction == "left") {
        this.cmp['set'+this.setFn](i + 1);
      }
    }, this);
  },
  // private
  addSwipeRight: function(itm, i){
    itm.mon(itm.el, 'swipe', function(ev) {
      if (ev.direction == "right") {
        this.cmp['set'+this.setFn](i - 1, {type : 'slide', direction : 'right'});
      }
    }, this);
  }
});

Ext.preg('swipetabs', Ext.ux.touch.SwipeTabs);