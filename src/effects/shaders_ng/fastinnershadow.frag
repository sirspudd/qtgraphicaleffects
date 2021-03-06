#version 440

layout(location = 0) in vec2 qt_TexCoord0;
layout(location = 0) out vec4 fragColor;

layout(std140, binding = 0) uniform buf {
    // qt_Matrix and qt_Opacity must always be both present
    // if the built-in vertex shader is used.
    mat4 qt_Matrix;
    float qt_Opacity;
    float weight1;
    float weight2;
    float weight3;
    float weight4;
    float weight5;
    vec4 color;
    float spread;
}

layout(binding = 1) uniform sampler2D original;
layout(binding = 2) uniform sampler2D source1;
layout(binding = 3) uniform sampler2D source2;
layout(binding = 4) uniform sampler2D source3;
layout(binding = 5) uniform sampler2D source4;
layout(binding = 6) uniform sampler2D source5;

float linearstep(float e0, float e1, float x) {
    return clamp((x - e0) / (e1 - e0), 0.0, 1.0);
}

void main() {
    vec4 shadowColor = texture(source1, qt_TexCoord0) * weight1;
    shadowColor += texture(source2, qt_TexCoord0) * weight2;
    shadowColor += texture(source3, qt_TexCoord0) * weight3;
    shadowColor += texture(source4, qt_TexCoord0) * weight4;
    shadowColor += texture(source5, qt_TexCoord0) * weight5;
    vec4 originalColor = texture(original, qt_TexCoord0);
    shadowColor.rgb = mix(originalColor.rgb, color.rgb * originalColor.a, linearstep(0.0, spread, shadowColor.a));
    fragColor = vec4(shadowColor.rgb, originalColor.a) * originalColor.a * qt_Opacity;
}
