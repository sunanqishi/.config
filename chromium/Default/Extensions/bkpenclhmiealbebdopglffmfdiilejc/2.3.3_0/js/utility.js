/**
* utility.js
* general utility functions used for modal, canvas, etc.
*/
(function(){

	var util = {

		/**
		* Centers modal on page
		* @param {jQuery object} modal
		*/
		centerModal: function(modal) {
			modal.css({'margin-top':(modal.outerHeight()/2)*-1, 'margin-left':(modal.outerWidth()/2)*-1});
		},

		/**
		* draws a table using canvas
		* @param {Number} width - width of table
		* @param {Number} height - height of table
		* @param {Number} rows - number of rows of table
		* @param {Number} cols - number of cols of table
		* @param {CanvasRenderingContext2D} context - 2D context of canvas object
		*/
		drawTable: function(width, height, rows, cols, context) {

			context.beginPath();

			var xOff = width/cols;
			var yOff = height/rows;

			//draw horizontal lines
			for(var rowIndex = 1; rowIndex < rows; rowIndex++){
				context.moveTo(0,yOff*rowIndex);
				context.lineTo(height,yOff*rowIndex);
			}

			//draw vertical lines
			for(var colIndex = 1; colIndex < cols; colIndex++){
				context.moveTo(xOff*colIndex,0);
				context.lineTo(xOff*colIndex,width);
			}

			context.closePath();
			context.stroke();
		},

		/**
		* draws a scaled table using canvas
		* @param {Number} width - width of table
		* @param {Number} height - height of table
		* @param {Number} scale - percentage of first col/row
		* @param {String} orientation - "vertical" or "horizontal" 
		* @param {CanvasRenderingContext2D} context - 2D context of canvas object
		*/
		drawScaledTable: function(width, height, scale, orientation, context) {

			context.beginPath();

			var offSet = width*(0.1)*scale;

			if(orientation === 'horizontal'){
				context.moveTo(offSet,0);
				context.lineTo(offSet,width);
			} else {
				context.moveTo(0,offSet);
				context.lineTo(height,offSet);
			}

			context.closePath();
			context.stroke();
		},

		/**
		* clears the canvas of previous drawing
		*/
		clearCanvas: function() {
			var canvas = $('canvas')[0];
			var context=canvas.getContext("2d");
			context.clearRect(0,0,context.canvas.width,context.canvas.height);
		},


		initSortable: function(){
			$('.sortable').sortable().on('sortupdate',function(){
				resize.layout.updateLayoutStore();
				sendTracking('dnd-event','dnd-label');
			});
			sortableInitialized = true;
		},

		resetSortable: function(){
			if(sortableInitialized){
				var $sortable = $('.sortable');
				$sortable.sortable('destroy');
				$sortable.sortable();
			}
		}

	};

	var sortableInitialized = false;

	window.resize.util = util;

})();