---
title: "Blog"
layout: single
permalink: /blog/
author_profile: true
---

**Weekly Simulation-based Technical Blog** 
*Jan 2025 - Ongoing*

- Focus on simulation-driven understanding of Electrical Engineering subjects

---

{% for post in site.posts %}
  {% if post.type == "blog" %}
### [{{ post.title }}]({{ post.url }})
  {% endif %}
{% endfor %}
