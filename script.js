const inputsDiv = document.getElementById("inputs");

document.getElementById("dist").addEventListener("change", function () {
    const val = this.value;
    inputsDiv.innerHTML = "";

    if (val === "binomial") {
        inputsDiv.innerHTML = `
            <input id="n" placeholder="n (trials)">
            <input id="k" placeholder="k (successes)">
            <input id="p" placeholder="p (probability)">
        `;
    }

    if (val === "poisson") {
        inputsDiv.innerHTML = `
            <input id="k" placeholder="k (occurrences)">
            <input id="lambda" placeholder="λ (rate)">
        `;
    }

    if (val === "uniform") {
        inputsDiv.innerHTML = `
            <input id="a" placeholder="a (start)">
            <input id="b" placeholder="b (end)">
        `;
    }

    if (val === "rayleigh") {
        inputsDiv.innerHTML = `
            <input id="sigma" placeholder="σ (scale)">
        `;
    }
});

function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

/* 🔥 Result card builder */
function resultCard(title, values) {
    let content = `<div class="result-card"><h2>${title}</h2>`;
    
    values.forEach(v => {
        content += `
            <div class="result-row">
                <span>${v.label}</span>
                <strong>${v.value}</strong>
            </div>
        `;
    });

    content += `</div>`;
    return content;
}

function calculate() {
    const dist = document.getElementById("dist").value;
    let result = "";

    try {
        if (dist === "binomial") {
            let n = parseInt(document.getElementById("n").value);
            let k = parseInt(document.getElementById("k").value);
            let p = parseFloat(document.getElementById("p").value);

            if (k > n || p < 0 || p > 1) throw "Invalid input";

            let mean = n * p;
            let variance = n * p * (1 - p);
            let prob = (factorial(n) / (factorial(k) * factorial(n - k))) * (p ** k) * ((1 - p) ** (n - k));

            result = resultCard("Binomial Distribution", [
                { label: `P[X = ${k}]`, value: prob.toFixed(3) },
                { label: "E[X]", value: mean.toFixed(3) },
                { label: "VAR[X]", value: variance.toFixed(3) }
            ]);
        }

        if (dist === "poisson") {
            let k = parseInt(document.getElementById("k").value);
            let lambda = parseFloat(document.getElementById("lambda").value);

            let prob = (lambda ** k * Math.exp(-lambda)) / factorial(k);

            result = resultCard("Poisson Distribution", [
                { label: `P(X = ${k})`, value: prob.toFixed(3) },
                { label: "E[X]", value: lambda.toFixed(3) },
                { label: "VAR[X]", value: lambda.toFixed(3) }
            ]);
        }

        if (dist === "uniform") {
            let a = parseFloat(document.getElementById("a").value);
            let b = parseFloat(document.getElementById("b").value);

            let mean = (a + b) / 2;
            let variance = ((b - a) ** 2) / 12;

            result = resultCard("Uniform Distribution", [
                { label: "E[X]", value: mean.toFixed(3) },
                { label: "VAR[X]", value: variance.toFixed(3) }
            ]);
        }

        if (dist === "rayleigh") {
            let sigma = parseFloat(document.getElementById("sigma").value);

            let mean = sigma * Math.sqrt(Math.PI / 2);
            let variance = ((4 - Math.PI) / 2) * sigma ** 2;

            result = resultCard("Rayleigh Distribution", [
                { label: "E[X]", value: mean.toFixed(3) },
                { label: "VAR[X]", value: variance.toFixed(3) }
            ]);
        }

    } catch (err) {
        result = `<div class="result-card">Invalid input. Check your values.</div>`;
    }

    document.getElementById("result").innerHTML = result;
}