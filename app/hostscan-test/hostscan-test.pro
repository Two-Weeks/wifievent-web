TEMPLATE = app
CONFIG += console c++11
CONFIG -= app_bundle
CONFIG -= qt
include(../../w.pri)
DESTDIR = $${PWD}/../../bin
SOURCES += \
        hostscan-test.cpp
