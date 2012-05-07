//Ext.ns('Ext.ux.touch');
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
Ext.define('Ext.ux.touch.SwipeTabs', {
    mixins: ['Ext.mixin.Observable'],

    alias: 'plugin.swipetabs',
    // private
    init: function(cmp){
      this.cmp = cmp;
      this.swipeRight = [];
      this.swipeLeft = []; 
      cmp.on('painted', this.initSwipeHandlers, this);
    },
    // private
    initSwipeHandlers: function(){
      this.cmp.til = this.cmp.items.length-1;
      this.cmp.items.each(function(itm, i){
        itm.idx = i;
        if (itm.allowSwipe !== false && !itm.docked){
          if (itm.getLayout().type === 'card'){
            if (itm.rendered){
              this.initChildSwipeHandlers(itm);
            }else{
              itm.on('painted', this.initChildSwipeHandlers, this);
            }
          }else{
            if (itm.rendered){
              this.addSwipe(itm, i);
            }else{
              itm.on('painted', function(){ 
               this.addSwipe(itm, i);
              }, this);
            }
          }
        }
      },this)
    },
    // private
    initChildSwipeHandlers: function(itm){
      var i = itm.idx;
      itm.items.each(function(itm){
        if (itm.rendered){
          this.addSwipe(itm, i);
        }else{
          itm.on('painted', function(){
            this.addSwipe(itm, i);
          }, this);
        }
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
      this.swipeLeft.push(itm);
      itm.element.on('swipe', this.onSwipeLeft, this);
    },
    // private
    onSwipeLeft: function(ev) {
      if(ev.direction == "left") {
        this.cmp.setActiveItem(this.cmp.getActiveItem().idx + 1);
      }
    },
    // private
    addSwipeRight: function(itm, i){
      this.swipeRight.push(itm);
      itm.element.on('swipe', this.onSwipeRight, this);
    },
    // private
    onSwipeRight: function(ev) {
      if(ev.direction == "right") {
        this.cmp.animateActiveItem(this.cmp.getActiveItem().idx - 2, {
          type : 'slide',
          direction : 'right'
        });
      }
    },
    // private
    parentDestroy: function(){
      
    }

});