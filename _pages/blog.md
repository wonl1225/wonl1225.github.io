---
title: "Research"
layout: single
permalink: /blog/
---

**Weekly Simulation-based Technical Blog** 
*(Jan 2025 - Ongoing)*
- Focus on simulation-driven understanding of physics theory relevant to Electrical Engineering

- Effect of Sampling Rate on Signals (Nyquist Rate)
- Numerical Verification of Gauss’s Law via Surface Integration

{% for post in site.posts %}
  {% if post.type == "blog" %}
### [{{ post.title }}]({{ post.url }})
  {% endif %}
{% endfor %}
