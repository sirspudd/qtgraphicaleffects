#version 440

layout(location = 0) in vec2 qt_TexCoord0;
layout(location = 0) out vec4 fragColor;

layout(std140, binding = 0) uniform buf {
    // qt_Matrix and qt_Opacity must always be both present
    // if the built-in vertex shader is used.
    mat4 qt_Matrix;
    float qt_Opacity;
    float lod;
};

layout(binding = 1) uniform sampler2D mask;
layout(binding = 2) uniform sampler2D source1;
layout(binding = 3) uniform sampler2D source2;
layout(binding = 4) uniform sampler2D source3;
layout(binding = 5) uniform sampler2D source4;
layout(binding = 6) uniform sampler2D source5;
layout(binding = 7) uniform sampler2D source6;

float weight(float v) {
    if (v <= 0.0)
        return 1.0;

    if (v >= 0.5)
        return 0.0;

    return 1.0 - v * 2.0;
}

void main() {
    vec4 maskColor = texture(mask, qt_TexCoord0);
    float l = lod * maskColor.a;

    float w1 = weight(abs(l - 0.100));
    float w2 = weight(abs(l - 0.300));
    float w3 = weight(abs(l - 0.500));
    float w4 = weight(abs(l - 0.700));
    float w5 = weight(abs(l - 0.900));
    float w6 = weight(abs(l - 1.100));

    float sum = w1 + w2 + w3 + w4 + w5 + w6;
    float weight1 = w1 / sum;
    float weight2 = w2 / sum;
    float weight3 = w3 / sum;
    float weight4 = w4 / sum;
    float weight5 = w5 / sum;
    float weight6 = w6 / sum;

    vec4 sourceColor = texture(source1, qt_TexCoord0) * weight1;
    sourceColor += texture(source2, qt_TexCoord0) * weight2;
    sourceColor += texture(source3, qt_TexCoord0) * weight3;
    sourceColor += texture(source4, qt_TexCoord0) * weight4;
    sourceColor += texture(source5, qt_TexCoord0) * weight5;
    sourceColor += texture(source6, qt_TexCoord0) * weight6;

    fragColor = sourceColor * qt_Opacity;
}
