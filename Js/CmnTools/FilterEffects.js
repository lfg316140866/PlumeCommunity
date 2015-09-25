Cmn.UI.CanvasTools.ImageEditing.ExtendFilterEffects("黑白", function (self) {
var _matrix = new createjs.ColorMatrix(0, 0,-100, 0);
this.filters = [
new createjs.ColorMatrixFilter(_matrix),
new createjs.ColorFilter(1, 1, 1, 1, 0, 0, 0, 0), 
new createjs.BlurFilter(0, 0, 1)
];
this.cache(0, 0, self.Width, self.Width);
});
Cmn.UI.CanvasTools.ImageEditing.ExtendFilterEffects("泛黄记忆", function (self) {
var _matrix = new createjs.ColorMatrix(0, 0,0, 0);
this.filters = [
new createjs.ColorMatrixFilter(_matrix),
new createjs.ColorFilter(1, 1, 1, 1, 24, 17, 0, 0), 
new createjs.BlurFilter(0, 0, 1)
];
this.cache(0, 0, self.Width, self.Width);
});
Cmn.UI.CanvasTools.ImageEditing.ExtendFilterEffects("老照片", function (self) {
var _matrix = new createjs.ColorMatrix(0, -19.796760656192518,-21.96441577359272, 0);
this.filters = [
new createjs.ColorMatrixFilter(_matrix),
new createjs.ColorFilter(1, 1, 1, 1, 82, 69, 8, 0), 
new createjs.BlurFilter(0, 0, 1)
];
this.cache(0, 0, self.Width, self.Width);
});
Cmn.UI.CanvasTools.ImageEditing.ExtendFilterEffects("昨日旧梦", function (self) {
var _matrix = new createjs.ColorMatrix(0, 10,-10, 0);
this.filters = [
new createjs.ColorMatrixFilter(_matrix),
new createjs.ColorFilter(1, 1, 1, 1, 20, 0, 18, 0), 
new createjs.BlurFilter(3, 3, 1)
];
this.cache(0, 0, self.Width, self.Width);
});
Cmn.UI.CanvasTools.ImageEditing.ExtendFilterEffects("光源", function (self) {
    self.FilterContainer.addChild(new createjs.Bitmap("images/FilterEffects/LightSource.png"))
});
Cmn.UI.CanvasTools.ImageEditing.ExtendFilterEffects("气泡", function (self) {
    self.FilterContainer.addChild(new createjs.Bitmap("images/FilterEffects/Bubble.png"))
});
Cmn.UI.CanvasTools.ImageEditing.ExtendFilterEffects("电影印象", function (self) {
    self.FilterContainer.addChild(new createjs.Bitmap("images/FilterEffects/MovieImpression.png"))
});