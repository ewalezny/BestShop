const Calculator = function () {
    this.prices = {
        products: 0.5,
        orders: 0.25,
        package: {
            basic: 0,
            professional: 25,
            premium: 60,
        },
        accounting: 35,
        terminal: 5
    }

    this.form = {
        products: document.querySelector("#products"),
        orders: document.querySelector("#orders"),
        package: document.querySelector("#package"),
        accounting: document.querySelector("#accounting"),
        terminal: document.querySelector("#terminal")
    }

    this.summary = {
        products: document.querySelector("[data-id='products']"),
        orders: document.querySelector("[data-id='orders']"),
        package: document.querySelector("[data-id='package']"),
        accounting: document.querySelector("[data-id='accounting']"),
        terminal: document.querySelector("[data-id='terminal']"),
        total: document.querySelector("#total-price")
    }

    this.productsEvent = this.productsEvent.bind(this);
    this.ordersEvent = this.ordersEvent.bind(this);
    this.dropdownEvent = this.dropdownEvent.bind(this);
    this.checkboxEvent = this.checkboxEvent.bind(this);

    this.addEvents();
}

Calculator.prototype.addEvents = function () {
    this.form.products.addEventListener("input", this.productsEvent);
    this.form.orders.addEventListener("input", this.ordersEvent);
    this.form.package.addEventListener("click", this.dropdownEvent);
    this.form.accounting.addEventListener("change", this.checkboxEvent);
    this.form.terminal.addEventListener("change", this.checkboxEvent);
}

Calculator.prototype.updateTotal = function () {
    this.summary.total.classList.add("open");

    const productsResult = this.form.products.value * this.prices.products;
    const ordersResult = this.form.orders.value * this.prices.orders;
    const packageResult = Number(this.form.package.dataset.value);
    const accountingResult = this.form.accounting.checked ? this.prices.accounting : 0;
    const terminalResult = this.form.terminal.checked ? this.prices.terminal : 0;

    this.summary.total.querySelector(".total__price").innerText = `$${productsResult + ordersResult + packageResult + accountingResult + terminalResult}`;
}

Calculator.prototype.productsEvent = function (e) {
    const value = e.currentTarget.value;

    if (value > 0) {
        this.summary.products.classList.add("open");
        this.summary.products.querySelector(".item__calc").innerText = `${value} * $${this.prices.products}`;
        this.summary.products.querySelector(".item__price").innerText = `$${value * this.prices.products}`;
    }
    if (!value.length) {
        this.summary.products.classList.remove("open");
        this.summary.total.classList.remove("open");
    }

    this.updateTotal();
}

Calculator.prototype.ordersEvent = function (e) {
    const value = e.currentTarget.value;

    if (value > 0) {
        this.summary.orders.classList.add("open");
        this.summary.orders.querySelector(".item__calc").innerText = `${value} * $${this.prices.orders}`;
        this.summary.orders.querySelector(".item__price").innerText = `$${value * this.prices.orders}`;
    }
    if (!value.length) {
        this.summary.orders.classList.remove("open");
        this.summary.total.classList.remove("open");
    }

    this.updateTotal();
}

Calculator.prototype.dropdownEvent = function (e) {
    this.form.package.classList.toggle("open");
    const selectInput = this.form.package.querySelector(".select__input");
    const calc = this.summary.package.querySelector(".item__calc");
    const price = this.summary.package.querySelector(".item__price");

    if (e.target.dataset.value === "basic") {
        this.summary.package.classList.add("open");
        selectInput.innerText = "Basic";
        calc.innerText = "Basic";
        this.form.package.dataset.value = this.prices.package.basic;
        price.innerText = `$${this.prices.package.basic}`;
    }
    if (e.target.dataset.value === "professional") {
        this.summary.package.classList.add("open");
        selectInput.innerText = "Professional";
        calc.innerText = "Professional";
        this.form.package.dataset.value = this.prices.package.professional;
        price.innerText = `$${this.prices.package.professional}`;
    }
    if (e.target.dataset.value === "premium") {
        this.summary.package.classList.add("open");
        selectInput.innerText = "Premium";
        calc.innerText = "Premium";
        this.form.package.dataset.value = this.prices.package.premium;
        price.innerText = `$${this.prices.package.premium}`;
    }

    this.updateTotal();
}

Calculator.prototype.checkboxEvent = function (e) {
    if (this.form.accounting.checked) {
        this.summary.accounting.classList.add("open");
    }
    if (!this.form.accounting.checked) {
        this.summary.accounting.classList.remove("open");
    }
    if (this.form.terminal.checked) {
        this.summary.terminal.classList.add("open");
    }
    if (!this.form.terminal.checked) {
        this.summary.terminal.classList.remove("open");
    }

    this.updateTotal();
}

document.addEventListener("DOMContentLoaded", function () {
    new Calculator();
});