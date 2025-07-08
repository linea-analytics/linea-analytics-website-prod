# The Different Ways to Measure Adstock (Memory effect) in MMM

## **Why model adstock in MMM?**

Advertising memories and brand equity decay rather than vanish instantly; ignoring this carry-over will decrease model accuracy and underestimate ROIs. Properly chosen adstock:

* **Reduces autocorrelation** in the residuals, improving statistical validity.  
* **Separates short-term boosts from long-term brand-building impacts**, guiding strategic decisions.  
* **Allows channel-specific memory,** e.g., TV usually decays slower than Paid Search

## **1\. Geometric-decay adstock**

### **Concept**

A single retention parameter θ (0 \< θ \< 1\) says what proportion of last period’s effect survives into the next; the sequence of weights is therefore a simple geometric progression.

Mathematically, for spend xtx\_txt​:

x\~t=xt+θxt−1+θ2xt−2+…\\tilde x\_t \= x\_t \+ \\theta x\_{t-1} \+ \\theta^2 x\_{t-2} \+ \\dotsx\~t​=xt​+θxt−1​+θ2xt−2​+…

## **2\. Weibull adstock**

### **Concept**

Instead of a constant decay, the **Weibull** kernel lets the decay rate itself vary with time. 

With **shape k and scale λ**:

wl=exp⁡ ⁣\[−(l/λ)k\],l=0,1,2,…w\_l \= \\exp\\\!\\bigl\[-(l/λ)^{k}\\bigr\],\\quad l=0,1,2,\\dotswl​=exp\[−(l/λ)k\],l=0,1,2,…

* **k \< 1** → fast initial drop, then long tail (good for quick-impact media).  
* **k \> 1** → “S-shaped” build-up before decaying, capturing delayed awareness (e.g., TV bursts).

### **Advantages & cautions**

* Greater flexibility reflects real funnel dynamics.  
* Requires non-linear optimisation; risk of over-fitting if data are scarce.  
* More parameters to estimate compared to geometric decay.

## **3\. Split-variable (current \+ lagged geometric)**

### **Concept**

Rather than folding carry-over into one transformed series, we **keep two regressors**:

1. **Current-week spend** xtx\_txt​ – captures immediate “pop”.  
2. **Lagged geometric adstock** x\~t(θ)\\tilde x\_{t}^{(\\theta)}x\~t(θ)​ – same θ as classic geometric.

This lets the model estimate separate coefficients, often revealing that short-term ROI differs sharply from long-term brand effect.

### **Pros & cons**

* **Pros:** Extra flexibility; aids interpretability for campaign planners and addresses known delays (e.g. delivery).  
* **Cons:** Adds collinearity risk and degrees of freedom; ensure VIF diagnostics

## **Choosing the right form**

| Criterion | Geometric | Weibull | Split Variable |
| ----- | ----- | ----- | ----- |
| **\# Parameters** | 1 | 2 | 1 (θ) \+ extra β |
| **Computation** | Fast linear | Non-linear | Linear but multicollinear |
| **Captures peak delay?** | No | Yes | Yes (via lag) |
| **Risk of overfit** | Low | Medium–High | Medium |
| **When to prefer** | Exploratory, digital | TV, upper-funnel, long memory | Stakeholders need to see short vs long-term |

In practice, many teams **start geometric**, test Weibull, then keep the split-variable only if coefficients are stable and VIF \< 5

## **Take-aways**

* **Adstock is not optional**; it’s fundamental to valid MMM.  
* **Geometric** is the dependable baseline; **Weibull** offers realism when media build slowly; **Split-variable** unveils distinct tactical vs brand pay-offs.  
* Always **cross-validate** and check out-of-sample fit, not just in-sample R².

Feel free to embed the widgets above in your own notebook or BI tool, tweak the sliders, and see how carry-over assumptions reshape sales curves and optimal budgets.

