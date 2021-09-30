CXX_MODULE=qml
TARGETPATH=QtGraphicalEffects/private
TARGET = qtgraphicaleffectsprivate
QML_IMPORT_VERSION = $$QT_VERSION

QT += quick qml
# Needed to get a hold of QQuickShaderEffectSource, QQuickImage and QQuickItemPrivate
QT += quick-private gui-private core-private qml-private

SOURCES += plugin.cpp \
           qgfxsourceproxy.cpp

HEADERS += \
           qgfxsourceproxy_p.h

QML_FILES = \
    DropShadowBase.qml \
    FastGlow.qml \
    FastInnerShadow.qml \
    FastMaskedBlur.qml \
    GaussianDirectionalBlur.qml \
    GaussianGlow.qml \
    GaussianInnerShadow.qml \
    GaussianMaskedBlur.qml

!static: CONFIG += qmlcache

load(qml_plugin)
