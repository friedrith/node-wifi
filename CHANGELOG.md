# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.0.16](https://github.com/friedrith/node-wifi/compare/v2.0.16-alpha.0...v2.0.16) (2021-10-22)

### [2.0.16-alpha.0](https://github.com/friedrith/node-wifi/compare/v2.0.15...v2.0.16-alpha.0) (2021-10-21)


### Bug Fixes

* hash integrity ([c33b4f3](https://github.com/friedrith/node-wifi/commit/c33b4f3842ff185fcfcbe3abf93178be8d947ed1))
* quick but remove bssid for macOS Monterey ([a450bec](https://github.com/friedrith/node-wifi/commit/a450becd7b29692f0dc7668d9769e5c391193463))
* vulnerable dependency ([5bb555d](https://github.com/friedrith/node-wifi/commit/5bb555dd9f2aca16c5520bdce9a9ec9025f91637))

### [2.0.15](https://github.com/friedrith/node-wifi/compare/v2.0.14...v2.0.15) (2021-08-11)


### Bug Fixes

* **windows:** connect network for non-admin users ([#164](https://github.com/friedrith/node-wifi/issues/164)) ([08440d4](https://github.com/friedrith/node-wifi/commit/08440d4353f40d9229ceb91c6ce9f1e950f32994)), closes [#159](https://github.com/friedrith/node-wifi/issues/159)

### [2.0.14](https://github.com/friedrith/node-wifi/compare/v2.0.13...v2.0.14) (2020-10-11)


### Bug Fixes

* dependencies vulnerabilities ([1066263](https://github.com/friedrith/node-wifi/commit/10662634725a314c5f585a33abf61cff3ea299f9))
* mac connect for quasar electron apps ([8005de9](https://github.com/friedrith/node-wifi/commit/8005de94dd1d0d1220d6fa09a163f97c4a22deda))
* **dependencies:** vulnerabilities ([#133](https://github.com/friedrith/node-wifi/issues/133)) ([47ad8a2](https://github.com/friedrith/node-wifi/commit/47ad8a220e7c691c4195d9d7b89ff204005e3d80))
* **dependencies:** vulnerabilities ([#135](https://github.com/friedrith/node-wifi/issues/135)) ([9a2a50e](https://github.com/friedrith/node-wifi/commit/9a2a50ee9b503d8b6ed78d82f094ab3ea1ecc114))
* **macos:** scripts ([#132](https://github.com/friedrith/node-wifi/issues/132)) ([36c938f](https://github.com/friedrith/node-wifi/commit/36c938f58cf66c377b631d15056d1fe359541b5d))
* **macos/scan:** parse networks when shifted ([0fa69c7](https://github.com/friedrith/node-wifi/commit/0fa69c7aaaca44ea83c4019dab342396e742a581))
* windows wifi scan issue fix for first network ([#138](https://github.com/friedrith/node-wifi/issues/138)) ([f6e878d](https://github.com/friedrith/node-wifi/commit/f6e878d48b91410929c5fe5f0a0ff39e34e50c56))

### [2.0.13](https://github.com/friedrith/node-wifi/compare/v2.0.12...v2.0.13) (2020-07-01)


### Bug Fixes

* wifi connect issue fix for Windows ([8d992a6](https://github.com/friedrith/node-wifi/commit/8d992a6))

### [2.0.12](https://github.com/friedrith/node-wifi/compare/v2.0.11...v2.0.12) (2019-09-06)


### Bug Fixes

* security vulnerability for cli (windows, mac and linux) ([a6668ca](https://github.com/friedrith/node-wifi/commit/a6668ca))
* windows connection profile execute ([84549cb](https://github.com/friedrith/node-wifi/commit/84549cb)), closes [#78](https://github.com/friedrith/node-wifi/issues/78)

### [2.0.11](https://github.com/friedrith/node-wifi/compare/v2.0.10...v2.0.11) (2019-09-01)


### Bug Fixes

* fix vulnerabilities ([f4b3965](https://github.com/friedrith/node-wifi/commit/f4b3965))

### [2.0.10](https://github.com/friedrith/node-wifi/compare/v2.0.8...v2.0.10) (2019-09-01)

### [2.0.9](https://github.com/friedrith/node-wifi/compare/v2.0.8...v2.0.9) (2019-09-01)

### 2.0.8 (2019-09-01)

### Bug Fixes

- **dependencies:** bump lodash from 3.10.1 to 4.17.11 [#75](https://github.com/friedrith/node-wifi/issues/75) ([04a9477](https://github.com/friedrith/node-wifi/commit/04a9477))
- **lint:** travis build ([08ab90e](https://github.com/friedrith/node-wifi/commit/08ab90e))
- adapt chalk string syntax ([d27b027](https://github.com/friedrith/node-wifi/commit/d27b027))

### 2.0.7

### Bug Fixes

- bug #66
- bug #50

### 2.0.6

### Bug Fixes

- bug #65
- bug #73

### 2.0.5

- new license LGPL-3.0
- add quality result which is as signal level but in percentage
- change the environment settings for en_US
- add new function to delete a previous profile #51

### Bug Fixes

- bug #38
- errors while scanning on raspberry or ASUS Tinker Board issue #41

### 2.0.4

- change urls in package.json because of the author's login changed

### Bug Fixes

- bug #29

### 2.0.3

### Bug Fixes

- bug #26

### 2.0.2

### Bug Fixes

- bug #24

### 2.0.1

- improve stability of windows scan and current connection

## 2.0.0

- add disconnection feature on windows (issue #16)
- add new fields in scan results (bssid equals to mac, channel, security_flags)
- improve stability of linux scan

### 1.2.5

### Bug Fixes

- bug #13

### 1.2.4

### Bug Fixes

- bug introduced during #7 fix

## 1.2.3

- improve environment variables management

### Bug Fixes

- bug disconnection #9
- bug #7
