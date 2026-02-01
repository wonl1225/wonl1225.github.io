---
title: "Week 01 - Effect of Sampling Rate on Signals"
excerpt: ""
layout: single
type: blog
categories: [Signal Processing]
tags: [Nyquist, Sampling, Simulation]
---

This Python Simulation investigates how different sampling rates affect a continuous sinusoidal signal.
The signal with a frequency of 8 Hz was sampled at 4 different rates: 5, 10, 25, and 50 Hz.

Sampling at low frequency (5, 10 Hz) produced distorted waveforms due to insufficient data points collected.
Sampling at higher frequency (25, 50 Hz) accurately preserved the sinusoidal shape.

These results clearly demonstrate the Nyquist–Shannon Sampling Theorem,
stating that a signal must be sampled above the Nyquist Rate to produce a proper graph.

Sampling below this rate will result in aliasing and mathematical insufficiency.

### Full Report & Source Code

[The full report, equations, and source code are available on GitHub.](https://github.com/wonl1225/EE-learning/tree/main/Week01_sampling)
