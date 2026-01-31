---
title: "Week 01 - Effect of Sampling Rate on Signals"
layout: single
type: blog
categories: [Signal Processing]
tags: [Nyquist, Sampling, Simulation]
---

This post is an exact mirror of the technical documentation
in the [linked GitHub repository](https://github.com/wonl1225/EE-learning/tree/main/Week01_sampling), published here for portfolio visibility.

## Objective
In this project, we will investigate the effect of how many times a discrete measurable value is captured on a continuous sinusoidal signal. Python was used to visualize and simulate the signal under multiple sampling rates.

The sinousodial signal is defined as:

$$
g(t) = \cos(2\pi f_s t)
$$

where fs represents signal frequency, which will be set to 8 Hz.

The signal was sampled at 4 different rates:

50 Hz

25 Hz

10 Hz

5 Hz

## Observations
Same sinusoidal graph were plotted using four different sampling rates. 

5 Hz: The graph is extremely distorted compared to the expected oscillating sinusoidal waveform. The lack of samples plot a misleading signal.

10 Hz: The signal lacks accuracy because distortion still remains, caused by the low sampling rate.

25 Hz: Even though it still maintains a rigid look, oscillations of the sinusoidal graph becomes more recognizable. 

50 Hz: This sampled rate produces the most accurate representation out of the 4 different simulations. The high sampling rate causes this plot to resemble the original sinusoidal shape accurately. 

## Explanations

Sampling rate directly represents the number of discrete measurements from a signal over a certain interval. This means when the signal of the sampling rate is too low, the signal becomes distorted. Due to the lack of points to capture true waveform of the graph, the computer simply connects these measurements linearly. At lower sampling rates like 5 Hz and 10 Hz, the sinusoidal waveform isn't visible due to lack of captured points. Instead of a smooth, oscillating graph, heavy distortions can be observed. At higher sampling rates such as 25 Hz and 50 Hz, the graph starts to smoothen out because of the increased captured points. 

Such result imply that there is a minimum sampling rate to observe a oscillatory behaviour of a signal. This behaviour is related to the Nyquist-Shannon sampling theorem, which was researched through Stanford Engineering's EE261 online course materials.



The fundamental idea is that the signal should be sampled at a rate of at least twice of its highest frequency--which is referred as a Nyquist rate--in order to produce an accurate graph. In this simulation, the signal frequency was set to 8 Hz, which means that we need at least 16 Hz(Nyquist rate) to produce a proper graph. As the lecture mentions, if this condition is not satisfied, you simply cannot get back the original function. The simulations we obtained clearly demonstrate the Nyquist-Shannon sampling theorem, where the signal preserve a sinusoidal waveform at 25 Hz and 50 Hz(fs > 16), but fail to construct a properly-leading signal due to distortion at 5 Hz and 10 Hz(fs < 16). 



Such failure to produce a proper graph is known as aliasing. Sampling below the Nyquist rate, the original high-frequency information "folds" into the lower-frequency and cause the "images" of the signal in the frequency domain to overlap. As aliasing is caused, the high-frequency data gets mixed up with lower frequency and the original function is mathematically lost.

Frequency of the sampled signal where the sampling rate was smaller than Nyquist rate can be expressed as:

$$
f_{alias} = |f - kf_s|
$$

Relating the simulation to this concept, the signal sampled at 10 Hz(which is below the 16 Hz threshold) is aliased.

$$
f_{alias} = |f - f_s| = |8 - 10| = 2\ \text{Hz}
$$

As a result, the controlled variable of 8 Hz signal appears as a low-frequency waveform, 2 Hz to be specific. 

## Limitations

This python simulation assumes ideal conditions, where it assumes perfectly executed linear interploation between samples collected with noise-free environment. For a real-world hardware system, additional factors such as sensor inaccuracy and noise would affect signal quality.

## Conclusion

This simulation demonstrates how sampling rates and Nyquist-Shannon theorem affect the accuracy of a continuous-time signal critically. Insufficient sampling and low sampling rate may lead to distorted signals, which directly affect performance and calculations. Since power calculations such as $P = I_{\mathrm{RMS}} \cdot V_{\mathrm{RMS}}$ rely on accurate peak-to-peak estimation, underestimating RMS voltage and RMS current will systematically lead to inaccurate power calculations. 

Such results from the simulation emphasize why maintaining a high sampling frequency, or above the Nyquist rate to be specific is the fundamental of building reliability of digital systems.  

-----------

## Contributors

**Won Lee** - Project Lead, Graphical Analysis, Theoretical Research, Technical Writing

**Ron Macarilay** - Data Visualization, Signal Processing, Documentation

## References

MIT OpenCourseWare – Signals and Systems, Lecture 16

Stanford Engineering Everywhere(SEE) - EE261 - The Fourier Transform and its Applications, Lecture 18

Matplotlib Document - https://matplotlib.org/
