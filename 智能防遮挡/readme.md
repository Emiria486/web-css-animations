前端实现方法就正如 PS 中的“蒙版”一样，实心区域允许，空白区域拒绝。而技术的核心就在蒙版的生成上，所以将这个功能称之为“蒙版弹幕”，而蒙版图片估计是由 AI 识别出来然后生成，一张图片也就一两 K，一次加载很多张也不会造成很大的负担，最后结合 svg 图+ css 的 mask-image 属性，通过在视频不同时的帧引入不同遮罩图，来实现弹幕遮挡的效果 。

mask-image 属性的用法
CSS 中的 mask-image 属性用于设置图像或文本的遮罩。它用于为 CSS 中的特定元素形成遮罩层。语法如下：

/_ <mask-source> value _/
mask-image: url(masks.svg#mask1);

/_ <image> values _/
mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);
mask-image: image(url(mask.png), skyblue);

/_ Multiple values _/
mask-image: image(url(mask.png), skyblue), linear-gradient(rgba(0, 0, 0, 1.0), transparent);

mask-image 指遮罩使用的图片资源，默认值是 none，也就是无遮罩图片。因此，和 border 属性中的 border-style 属性类似，是一个想要有效果就必须设定的属性值。

mask-image 遮罩所支持的图片类型非常的广泛，可以是 url()静态图片资源，格式包括 JPG，PNG 以及 SVG 等都是支持的；也可以是动态生成的图片，例如使用各种 CSS3 渐变绘制的图片。语法上支持 CSS3 各类渐变，以及 url()功能符，image()功能符，甚至 element()功能符。

同时还支持多背景，因此理论上，使用 mask-image 我们可以遮罩出任意我们想要的图形，非常强大。
