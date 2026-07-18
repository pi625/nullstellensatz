---
layout: post
title: "The Sumset Puzzle"
date: 2026-07-18
excerpt: "Pick numbers from Z_p and build sumsets; a gentle intro to Cauchy-Davenport."
---

Pick any 4 numbers from the set $\{0, 1, 2, 3, 4, 5, 6\}$. Add every possible pair together, wrapping around modulo 7. How many unique numbers do you get?

Let's define the notation simply. We have a prime $p$, and two sets $A$ and $B$ which are subsets of $\mathbb{Z}_p$. We define the **sumset** as:

$$ A+B = \{a + b \pmod p \mid a \in A, b \in B\} $$

Play around with different primes and different set sizes. Try to find a lower bound. What's the absolute worst-case scenario for $|A+B|$? If you think you've got it, formulate your guess and test small examples.

> Answer: No matter how cleverly you pick $A$ and $B$, the size of $A+B$ never drops below $\min(p, |A|+|B|-1)$ — this is the Cauchy-Davenport theorem.

This post is part of a short exposition series that will connect classical combinatorial number theory with polynomial methods (Alon's Combinatorial Nullstellensatz). MathJax is enabled for inline and display math.
