
// TagCloud
const Texts = [
    "CPP",
    "C",
    "Java",
    "JavaFx",
    "Python",
    "C#",
    "Unreal",
    "Godot",
    "QT",
    "MySQL",
    "OpenGL",
    "Blender",
    "Photoshop",
    "Premiere Pro",
    "HTML",
    "CSS",
    "JS",
];

var tagCloud = TagCloud(".Sphere", Texts, {
    radius: 200,
    maxSpeed: "normal",
    initSpeed: "fast",
    direction: 135,
    keep: true,
});

tagCloud.$el.style.width = "-webkit-fill-available";