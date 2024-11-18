var frontend = {
    "ajaxurl": "https:\/\/www.fpmortgage.com\/wp-admin\/admin-ajax.php",
    "piColor": "#3498db", // Principal and Interest Color
    "hoaDues": "#2ecc71", // HOA Dues Color
    "taxes": "#e74c3c",   // Taxes Color
    "pmi": "#9b59b6",     // PMI Color
    "insurance": "#f39c12", // Insurance Color
    "extraPay": "#d35400" // Extra Payment Color
};

// var homePrice = 350000;
// var downPayment = 70000;
// var homeownersInsurence = 1225;
// var insurence = 0;
// var hoa = 50;
// var taxes = 0;
// var pmi = 0;
// var extraInicial = 0;
// var extra = 0;
// var loanAmount = 280000;
// var years = 30;
// var rate = "4.38";
// var Total = 0;
// var totalInterestPaid = 0;
// var PropertyTax = "1.25";
// var TotalAllPayment = 0;
// var monthly = 0;
// var cashBombMoney = 50000;
// var PaymentAmount = 0;
// var labelAmount = "";
// var slider1 = 1;
// var numberCalc = 12;
// var payOff = "";

var homePrice = parseFloat($('#homePrice').val()) || 0;
var downPayment = parseFloat($('#downPayment').val()) || 0;
var homeownersInsurence = parseFloat($('#homeownersInsurence').val()) || 0;
var insurence = 0;
var hoa = parseFloat($('#hoaDues').val()) || 0;
var taxes = 0;
var pmi = 0;
var extraInicial = 0;
var extra = 0;
var loanAmount = parseFloat($('#loanAmount').val()) || 0;
var years = parseFloat($('#LoanTerm').find(':selected').val()) || 0;
var rate = parseFloat($('#interestRate').val()) || 0;
var Total = 0;
var totalInterestPaid = 0;
var PropertyTax = parseFloat($('#propertyTax').val()) || 0;
var TotalAllPayment = 0;
var monthly = 0;
var cashBombMoney = 50000;
var PaymentAmount = 0;
var labelAmount = 0;
var slider1 = 0;
var numberCalc = 12;
var payOff = 0;

extra = extraInicial + monthly;
extra = parseFloat(extra);

(function (jQuery) {
    jQuery.fn.currencyInput = function () {

        this.each(function () {
            var wrapper = jQuery("<div class='currency-input' />");
            jQuery(this).wrap(wrapper);
            jQuery(this).before("<span class='currency-symbol'>$</span>");
            jQuery(this).change(function () {
                var min = parseFloat(jQuery(this).attr("min"));
                var max = parseFloat(jQuery(this).attr("max"));
                var value = this.valueAsNumber;
                if (value < min)
                    value = min;
                else if (value > max)
                    value = max;
                jQuery(this).val(value.toFixed(2));
            });
        });
    };
})(jQuery);

// Jquery Dependency

function formatNumber(n) {
    // format number 1000000 to 1,234,567
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function formatCurrency(input, blur) {
    // appends $ to value, validates decimal side
    // and puts cursor back in right position.
    var label = false;
    // get input value
    var input_val = input.val();

    // don't validate empty input
    if (input_val === "") {
        input_val = input.text();
        label = true;
    }

    if (input_val === "") {
        return;
    }

    // original length
    var original_len = input_val.length;

    // initial caret position
    var caret_pos = input.prop("selectionStart");

    // check for decimal
    if (input_val.indexOf(".") >= 0) {

        // get position of first decimal
        // this prevents multiple decimals from
        // being entered
        var decimal_pos = input_val.indexOf(".");

        // split number by decimal point
        var left_side = input_val.substring(0, decimal_pos);
        var right_side = input_val.substring(decimal_pos);

        // add commas to left side of number
        left_side = formatNumber(left_side);

        // validate right side
        right_side = formatNumber(right_side);

        // On blur make sure 2 numbers after decimal
        if (blur === "blur") {
            right_side += "00";
        }

        // Limit decimal to only 2 digits
        right_side = right_side.substring(0, 2);

        // join number by .
        input_val = "$" + left_side + "." + right_side;

    } else {
        // no decimal entered
        // add commas to number
        // remove all non-digits
        input_val = formatNumber(input_val);
        input_val = "$" + input_val;

        // final formatting
        if (blur === "blur") {
            input_val += ".00";
        }
    }

    if (label) {
        input.text(input_val);
    } else {
        input.val(input_val);
        // put caret back in the right position
        var updated_len = input_val.length;
        caret_pos = updated_len - original_len + caret_pos;
        //input[0].setSelectionRange(caret_pos, caret_pos);
    }
}

function calculate(loanAmount, rate, years) {
    var r = rate / 100;
    r = parseFloat(r / numberCalc);
    var n = years * numberCalc;
    n = parseFloat(n);
    var P = parseFloat(loanAmount);
    principle = P * ((r * Math.pow((1 + r), n)) / (Math.pow((1 + r), n) - 1));
    if (r > 0) {
        jQuery("#principle").html("$" + parseFloat(principle).toFixed(2));
    } else {
        jQuery("#principle").text("$0");
    }
    formatCurrency(jQuery('#principle'));
    TotalInterestPaid(years, principle, loanAmount);
}

function TotalInterestPaid(years, principle, loanAmount) {
    var n = years * numberCalc;
    n = parseFloat(n);
    totalInterestPaid = (n * principle) - loanAmount;
    jQuery("#totalInterestPaid").html("$" + parseFloat(totalInterestPaid).toFixed(2));
    formatCurrency(jQuery('#totalInterestPaid'));
}

function TotalSum(principle, hoa, taxes, pmi, insurence, extra) {
    Total = principle + hoa + taxes + pmi + insurence + extra;
    Total = parseFloat(Total);
    graph(principle, hoa, taxes, pmi, insurence, extra);
}

function AllPayment(years, downPayment) {
    calculate(loanAmount, rate, years);
    calcInsurence(homeownersInsurence);
    TotalSum(principle, hoa, taxes, pmi, insurence, extra);
    if (slider1 == 1) {
        monthlySlider();
    } else if (slider1 == 2) {
        biweekly();
    } else {
        weekly();
    }
    //calcPayOff();
    var n = years * 12;
    n = parseFloat(n);

    // Down Payment should be in percentage
    const downPaymentInPercent = downPayment / 100;
    TotalAllPayment = parseFloat(Total * n) + parseFloat(downPaymentInPercent);
    
    jQuery("#allPayment").html("$" + parseFloat(TotalAllPayment).toFixed(2));
    formatCurrency(jQuery('#allPayment'));
}

function Taxes(homePrice, PropertyTax) {
    PropertyTax = PropertyTax / 100;
    taxes = (homePrice * PropertyTax) / 12;
    TotalSum(principle, hoa, taxes, pmi, insurence, extra);
    jQuery("#TaxesSpan").html("$" + parseFloat(taxes).toFixed(2));
    formatCurrency(jQuery('#TaxesSpan'));
}

function calcInsurence(homeownersInsurence) {
    insurence = parseFloat(homeownersInsurence);
    insurence = insurence / 12;
    insurence = parseFloat(insurence);
    jQuery("#homeownersInsurenceSpan").html("$" + insurence.toFixed(2));
    formatCurrency(jQuery('#homeownersInsurenceSpan'));
}

function biweekly() {
    PaymentAmount = ((Total * 12) / 52) * 2;
    PaymentAmount = parseFloat(PaymentAmount);
    labelAmount = "/bi-wkly";
    jQuery("#paymentAmount").html("$" + PaymentAmount.toFixed(2).toString() + labelAmount);
    formatCurrency(jQuery('#paymentAmount'));
    console.log('biweekly');

}

function weekly() {
    PaymentAmount = (Total * 12) / 52;
    PaymentAmount = parseFloat(PaymentAmount);
    labelAmount = "/wkly";
    jQuery("#paymentAmount").html("$" + PaymentAmount.toFixed(2).toString() + labelAmount);
    formatCurrency(jQuery('#paymentAmount'));
    console.log('weekly');
}

function monthlySlider() {
    PaymentAmount = parseFloat(Total);
    labelAmount = "/mthly";
    jQuery("#paymentAmount").html("$" + PaymentAmount.toFixed(2).toString() + labelAmount);
    formatCurrency(jQuery('#paymentAmount'));
    console.log('monthly');
}

function graph(principle, hoa, taxes, pmi, insurence, extra) {
    jQuery("#graph").html('<canvas id="myChart"></canvas>');
    var ctx = jQuery('#myChart');
    var data = {
        labels: [
            "Principle and Interest",
            "HOA",
            "Taxes",
            "PMI",
            "Insurance",
            "Extra Payment"
        ],
        datasets: [{
            data: [
                principle.toFixed(2),
                hoa.toFixed(2),
                taxes.toFixed(2),
                pmi.toFixed(2),
                insurence.toFixed(2),
                extra.toFixed(2)
            ],

            backgroundColor: [
                frontend.piColor,
                frontend.hoaDues,
                frontend.taxes,
                frontend.pmi,
                frontend.insurance,
                frontend.extraPay
            ]
        }],
    };

    var options = {
        cutoutPercentage: 87,
        tooltips: {
            callbacks: {
                title: function (tooltipItem, data) {
                    return data['labels'][tooltipItem[0]['index']];
                },
                label: function (tooltipItem, data) {
                    return data['datasets'][0]['data'][tooltipItem['index']];
                },
            },

        },
        legend: {
            display: false
        },
        responsive: true,
        maintainAspectRatio: true,
    };

    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: options
    });

    Chart.pluginService.register({
        afterDraw: function (chart) {
            jQuery('.text-center .line-2').text('$' + parseFloat(Total).toFixed(2));
            formatCurrency(jQuery('.text-center .line-2'));
        }
    });
}

function calcPayOff() {

    var monthsLeftTotal = 0;
    var yearsLeftTotal = 0;

    var rnd = function (n) {
        return Math.round(n * 100) / 100; // round to 2 digits
    };

    var principal = Number(loanAmount);
    var interest = Number(rate);
    var months = Number(years * 12);

    var i = interest / 100.0 / 12;
    var payment = rnd(principal * (i + i / (Math.pow(1 + i, months) - 1)));

    //var tabledata = '';
    var m;
    var balance = principal - cashBombMoney;
    var totalinterest = 0;
    var monthsLeft = 0;
    var bombFrequency = jQuery('#sliderCashbombPer').slider('value');
    var bombAmount = jQuery('#sliderCashbombAmt').slider('value');
    var yearCount = 0;

    // Cash Bomb cycle.
    for (m = 1; m < months && bombAmount > 1; m++) {

        if (bombFrequency == 2) {

            yearCount++;

            if (yearCount == 12) {
                balance = balance - cashBombMoney;
                yearCount = 0;
            }
        }

        if (bombFrequency == 3) {

            yearCount++;

            if (yearCount == (months / 4).toFixed(0)) {
                balance = balance - cashBombMoney;
                yearCount = 0;
            }
        }

        var tointerest = rnd(balance * i);
        totalinterest = totalinterest + tointerest;
        var toprincipal = rnd(payment - tointerest);
        balance = rnd(balance - toprincipal);

        if (balance < 0) {
            monthsLeft = (months - m);
            break;
        }

    }

    var savings = 0;

    if (bombAmount > 1) {
        yearsLeft = Number((monthsLeft / 12).toFixed(0));
        monthsLeft = Number(monthsLeft - (yearsLeft * 12));
        yearsLeftTotal = yearsLeft;
        monthsLeftTotal = monthsLeft;
        savings = Number(jQuery('#totalInterestPaid').text().replace(/[^0-9.-]+/g, "")) - totalinterest;
    }

    var principal = Number(loanAmount);
    var interest = Number(rate);
    var months = Number(years * 12);

    var i = interest / 100.0 / 12;


    var m;
    var balance = principal;
    var totalinterest = 0;
    var monthsLeft = 0;
    var bombFrequency = jQuery('#sliderIncreaseFreq').slider('value');
    var yearCount = 0;
    var payment = rnd(principal * (i + i / (Math.pow(1 + i, months) - 1)));
    var numPayments = 12;
    var monthlyAdd = monthly;

    if (bombFrequency == 2) {
        numPayments = 26;
        months = Number(years * numPayments);
        payment = payment / 2;
        monthlyAdd = monthly / 2;
    }

    if (bombFrequency == 3) {
        numPayments = 52;
        months = Number(years * numPayments);
        payment = payment / 4;
        monthlyAdd = monthly / 4;
    }

    var monthlyAdd = monthly;

    // Increase Frequency and Additional Monthly.
    for (m = 1; m < months && numPayments > 0; m++) {

        var tointerest = rnd(interest / numPayments * balance / 100);
        totalinterest = totalinterest + tointerest;
        var toprincipal = rnd(payment - tointerest);
        balance = rnd(balance - toprincipal - monthlyAdd);

        if (balance < 0) {
            monthsLeft = (months - m);
            break;
        }

    }

    if (bombFrequency == 2) {
        yearsLeft = (monthsLeft / 26).toFixed(0);
        monthsLeft = (monthsLeft - (yearsLeft * 26)) * 12 / 26;
    }

    if (bombFrequency == 3) {
        yearsLeft = (monthsLeft / 26 / 2).toFixed(0);
        monthsLeft = (monthsLeft - (yearsLeft * 52)) * 12 / 26 / 2;
    }

    if (bombFrequency == 1) {
        yearsLeft = Math.floor(monthsLeft / 12);
        monthsLeft = (monthsLeft - (yearsLeft * 12));
    }

    // Sum all totals.
    yearsLeftTotal = yearsLeftTotal + Number(yearsLeft);
    monthsLeftTotal = monthsLeftTotal + Number(monthsLeft.toFixed(0));

    if (yearsLeftTotal > 0) {
        yearsLeft = yearsLeftTotal + ' years';
    } else {
        yearsLeft = '';
    }

    if (monthsLeftTotal > 0) {
        monthsLeft = ' ' + monthsLeftTotal + ' months';
    } else {
        monthsLeft = '';
    }
    if (yearsLeftTotal > 0 || monthsLeftTotal > 0) {
        payOff = yearsLeft + monthsLeft;
    }

    if (totalinterest > 0) {
        savings = savings + Number(jQuery('#totalInterestPaid').text().replace(/[^0-9.-]+/g, "")) - totalinterest;
    }

    if ((monthsLeftTotal == 0 && yearsLeftTotal == 0)) {
        payOff = '-';
        savings = '$0';
    }


    jQuery('#payOff').text(payOff);

    jQuery('#savings').text(savings);
    formatCurrency(jQuery('#savings'));

}

jQuery(document).ready(function ($) {

    $('.principle-interest-color').css('background-color', frontend.piColor);
    $('.hoa-dues-color').css('background-color', frontend.hoaDues);
    $('.taxes-color').css('background-color', frontend.taxes);
    $('.pmi-color').css('background-color', frontend.pmi);
    $('.insurance-color').css('background-color', frontend.insurance);
    $('.extra-pay-color').css('background-color', frontend.extraPay);
    $('.principle-interest-color').css('background-color', frontend.piColor);
    formatCurrency($('input#homePrice'));
    formatCurrency($('input#downPayment'));
    formatCurrency($('input#loanAmount'));
    formatCurrency($('input#homeownersInsurence'));
    formatCurrency($('input#hoaDues'));
    formatCurrency($('input#pmi'));
    formatCurrency($('input#extraPayment'));
    formatCurrency(jQuery('#totalLoanAmount'));
    // rate = $('#interestRate').val();
    // calculate(loanAmount, rate, years);
    // calcInsurence(homeownersInsurence);
    // Taxes(homePrice, PropertyTax);
    // AllPayment(years, downPayment);
    $("input[data-type='currency']").on({
        keyup: function (e) {
            if (e.keyCode >= 37 && e.keyCode <= 40 || e.keyCode == 8 || e.keyCode == 46) {
                e = e;
            } else {
                formatCurrency($(this));
            }
        },
        blur: function (e) {
            if (e.keyCode >= 37 && e.keyCode <= 40 || e.keyCode == 8 || e.keyCode == 46) {
                e = e;
            } else {
                formatCurrency($(this), "blur");
            }
        },
        focusout: function (e) {
            jQuery('#' + jQuery(this).attr('id')).trigger('change');
        }
    });

    $(document).on('change', '#homePrice', function () {
        homePrice = $(this).val();
        homePrice = homePrice.replace('$', '').replace(',', '');
        homePrice = parseFloat(homePrice);

        PropertyTax = $("#propertyTax").val();
        PropertyTax = parseFloat(PropertyTax);
        calculate(loanAmount, rate, years);
        Taxes(homePrice, PropertyTax);
    });

    $(document).on('change', '#propertyTax', function () {
        PropertyTax = $(this).val();
        PropertyTax = parseFloat(PropertyTax);
        homePrice = $("#homePrice").val()
        homePrice = Number(homePrice.replace(/[^0-9.-]+/g, ""));
        //homePrice = homePrice.replace('$', '').replace(',','');
        //homePrice = parseFloat(homePrice);
        calculate(loanAmount, rate, years);
        Taxes(homePrice, PropertyTax);
    });

    $(document).on('change', '#downPayment', function () {
        downPayment = $(this).val();
        downPayment = Number(downPayment.replace(/[^0-9.-]+/g, ""));
        //downPayment = downPayment.replace('$', '').replace(',','');
        //downPayment = parseFloat(downPayment);
        AllPayment(years, downPayment);
    });

    $(document).on('change', '#loanAmount', function () {
        loanAmount = $(this).val();
        //loanAmount = loanAmount.replace('$', '').replace(',','');
        loanAmount = Number(loanAmount.replace(/[^0-9.-]+/g, ""));
        //loanAmount = parseFloat(loanAmount);
        $("#totalLoanAmount").html("$" + $(this).val());
        formatCurrency(jQuery('#totalLoanAmount'));
        calculate(loanAmount, rate, years);
        AllPayment(years, downPayment);
    });

    $(document).on('change', '#LoanTerm', function () {
        years = $(this).val();
        AllPayment(years, downPayment);
    });

    $(document).on('change', '#interestRate', function () {
        rate = $(this).val();
        rate = parseFloat(rate);
        AllPayment(years, downPayment);
    });

    $(document).on('change', '#hoaDues', function () {
        hoa = $(this).val();
        hoa = hoa.replace('$', '').replace(',', '');
        hoa = parseFloat(hoa);
        $("#HOADuesSpan").html($(this).val());
        AllPayment(years, downPayment);
    });

    $(document).on('change', '#pmi', function () {
        pmi = $(this).val();
        pmi = pmi.replace('$', '').replace(',', '');
        pmi = parseFloat(pmi);
        $("#pmiSpan").html($(this).val());
        AllPayment(years, downPayment);
    });

    $(document).on('change', '#extraPayment', function () {
        extraInicial = $(this).val();
        extraInicial = Number(extraInicial.replace(/[^0-9.-]+/g, ""));
        //extraInicial = extraInicial.replace('$', '').replace(',','');
        extra = parseFloat(extraInicial) + parseFloat(monthly);
        extra = parseFloat(extra);
        $("#extraPaymentSpan").text(extra);
        formatCurrency(jQuery('#extraPaymentSpan'));
        AllPayment(years, downPayment);
    });

    $(document).on('change', '#homeownersInsurence', function () {
        homeownersInsurence = $(this).val();
        homeownersInsurence = homeownersInsurence.replace('$', '').replace(',', '');
        AllPayment(years, downPayment);
    });

    $(document).on('click', '#getQuote', function (e) {
        e.preventDefault();
        window.location.href = $(this).attr('data-link');
        /*
                $.ajax({
                   type: 'POST',
                   url: frontend.ajaxurl,
                   data: {
                       action:          'save_mortgage_calc',
                       loan_amount:      $( '#loanAmount').val().replace(/[^0-9.-]+/g,""),
                       loan_term:        $( '#LoanTerm' ).val(),
                       interest_rate:    $( '#interestRate' ).val(),
                       email:            $( '#mortage_email' ).val(),
                       increase_freq:    $( '#sliderIncreaseFreq').slider( 'value' ),
                       additional_moth:  $( '#sliderAdditionalMth').slider( 'value' ),
                       cash_bomb_amount: $( '#sliderCashbombAmt').slider( 'value' ),
                       cash_bomb_freq:   $( '#sliderCashbombPer').slider( 'value' ),

                       },

                   success: function( response ) {

                       console.log(response);

                   }
               });

               */
    });

    $("#sliderIncreaseFreq").slider({
        value: 1,
        min: 1,
        max: 3,
        step: 1,
        change: function (event, ui) {

            if (ui.value == 1) {
                slider1 = 1;
                monthlySlider();
            } else if (ui.value == 2) {
                slider1 = 2;
                biweekly();
            } else {
                slider1 = 3;
                weekly();
            }
            calcPayOff();
        },
    })
        .each(function () {
            var opt = $(this).data().uiSlider.options;
            var vals = opt.max - opt.min;
            for (var i = 0; i <= vals; i++) {
                var text = "";
                switch (i) {
                    case 0:
                        text = "Monthly";
                        break;
                    case 1:
                        text = "Bi weekly";
                        break;
                    case 2:
                        text = "Weekly";
                        break;
                }
                var el = $('<label>' + text + '</label>').css('left', (i / vals * 100) + '%');
                $("#sliderIncreaseFreq").append(el);
            }
        });

    $("#sliderAdditionalMth").slider({
        value: 1,
        min: 1,
        max: 11,
        step: 1,
        change: function (event, ui) {
            if (ui.value == 1) {
                monthly = 0;
            } else if (ui.value == 2) {
                monthly = 50;
            } else if (ui.value == 3) {
                monthly = 100;
            } else if (ui.value == 4) {
                monthly = 150;
            } else if (ui.value == 5) {
                monthly = 200;
            } else if (ui.value == 6) {
                monthly = 250;
            } else if (ui.value == 7) {
                monthly = 300;
            } else if (ui.value == 8) {
                monthly = 350;
            } else if (ui.value == 9) {
                monthly = 400;
            } else if (ui.value == 10) {
                monthly = 450;
            } else {
                monthly = 500;
            }
            calcPayOff();
            extra = parseFloat(extraInicial) + parseFloat(monthly);
            extra = parseFloat(extra);
            $("#extraPaymentSpan").html("$" + extra.toFixed(2).toString());
            $(".valueExcess").html("$" + monthly);
            AllPayment(years, downPayment);

        },
    })
        .each(function () {
            var opt = $(this).data().uiSlider.options;
            var vals = opt.max - opt.min;
            for (var i = 0; i <= vals; i++) {
                var text = "";
                switch (i) {
                    case 0:
                        text = "$0";
                        break;
                    case 1:
                        text = "";
                        break;
                    case 2:
                        text = "";
                        break;
                    case 3:
                        text = "";
                        break;
                    case 4:
                        text = "";
                        break;
                    case 5:
                        text = "";
                        break;
                    case 6:
                        text = "";
                        break;
                    case 7:
                        text = "";
                        break;
                    case 8:
                        text = "";
                        break;
                    case 9:
                        text = "";
                        break;
                    case 10:
                        text = "$500";
                        break;
                }
                var el = $('<label>' + text + '</label>').css('left', (i / vals * 100) + '%');

                $("#sliderAdditionalMth").append(el);

            }
        });

    $("#sliderCashbombAmt").slider({
        value: 1,
        min: 1,
        max: 21,
        step: 1,
        change: function (event, ui) {

            if (ui.value == 1) {
                cashBombMoney = 0;
            } else {
                cashBombMoney = (ui.value - 1) * 5000;
            }

            $('.valueCashBomb').html('$' + cashBombMoney);

            calcPayOff();

        },
    })
        .each(function () {
            var opt = $(this).data().uiSlider.options;
            var vals = opt.max - opt.min;
            for (var i = 0; i <= vals; i++) {
                var text = "";
                switch (i) {
                    case 0:
                        text = "$0";
                        break;
                    case 20:
                        text = "$100k";
                        break;
                    default:
                        text = "";
                }
                var el = $('<label>' + text + '</label>').css('left', (i / vals * 100) + '%');

                $("#sliderCashbombAmt").append(el);


            }
        });

    $('#sliderCashbombPer').slider({
        value: 1,
        min: 1,
        max: 3,
        step: 1,
        change: function (event, ui) {
            var bombVal = $('#sliderCashbombAmt').slider('value');

            $('#sliderCashbombAmt').slider('value', bombVal);


        },
    })
        .each(function () {
            var opt = $(this).data().uiSlider.options;
            var vals = opt.max - opt.min;
            for (var i = 0; i <= vals; i++) {
                var text = "";
                switch (i) {
                    case 0:
                        text = "One Time";
                        break;
                    case 1:
                        text = "Yearly";
                        break;
                    case 2:
                        text = "Quarterly";
                        break;
                }
                var el = $('<label>' + text + '</label>').css('left', (i / vals * 100) + '%');

                $("#sliderCashbombPer").append(el);

            }
        });


});
