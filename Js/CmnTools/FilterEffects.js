//黑白滤镜
Cmn.UI.CanvasTools.ImageEditing.ExtendFilterEffects("BlackAndWhite", function (self) {
var _matrix = new createjs.ColorMatrix(0, 0,-100, 0);
this.filters = [
new createjs.ColorMatrixFilter(_matrix),
new createjs.ColorFilter(1, 1, 1, 1, 0, 0, 0, 0), 
new createjs.BlurFilter(0, 0, 1)
];
this.cache(0, 0, this.getBounds().width, this.parent.getBounds().height);
});
//泛黄记忆滤镜
Cmn.UI.CanvasTools.ImageEditing.ExtendFilterEffects("YellowedMemories", function (self) {
var _matrix = new createjs.ColorMatrix(0, 0,0, 0);
this.filters = [
new createjs.ColorMatrixFilter(_matrix),
new createjs.ColorFilter(1, 1, 1, 1, 24, 17, 0, 0), 
new createjs.BlurFilter(0, 0, 1)
];
this.cache(0, 0, this.getBounds().width, this.parent.getBounds().height);
});
//老照片滤镜
Cmn.UI.CanvasTools.ImageEditing.ExtendFilterEffects("OldPicture", function (self) {
var _matrix = new createjs.ColorMatrix(0, -19.796760656192518,-21.96441577359272, 0);
this.filters = [
new createjs.ColorMatrixFilter(_matrix),
new createjs.ColorFilter(1, 1, 1, 1, 82, 69, 8, 0), 
new createjs.BlurFilter(0, 0, 1)
];
this.cache(0, 0, this.getBounds().width, this.parent.getBounds().height);
});
//昨日旧梦滤镜
Cmn.UI.CanvasTools.ImageEditing.ExtendFilterEffects("YesterdayDreams", function (self) {
var _matrix = new createjs.ColorMatrix(0, 10,-10, 0);
this.filters = [
new createjs.ColorMatrixFilter(_matrix),
new createjs.ColorFilter(1, 1, 1, 1, 20, 0, 18, 0), 
new createjs.BlurFilter(3, 3, 1)
];
this.cache(0, 0, this.getBounds().width, this.parent.getBounds().height);
});
//光源滤镜
Cmn.UI.CanvasTools.ImageEditing.ExtendFilterEffects("LightSource", function (self) {
    self.FilterContainer.addChild(new createjs.Bitmap("images/FilterEffects/LightSource.png"))
});
//气泡滤镜
Cmn.UI.CanvasTools.ImageEditing.ExtendFilterEffects("Bubble", function (self) {
    self.FilterContainer.addChild(new createjs.Bitmap("images/FilterEffects/Bubble.png"))
});
//电影影响滤镜
Cmn.UI.CanvasTools.ImageEditing.ExtendFilterEffects("MovieImpression", function (self) {
    self.FilterContainer.addChild(new createjs.Bitmap("images/FilterEffects/MovieImpression.png"))
});