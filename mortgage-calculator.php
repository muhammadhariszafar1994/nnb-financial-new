<?php include 'include/header.php'; ?>
<title>NNB FINANCIAL, INC</title>
</head>

<body class="scrolllenis" id="top">
    <?php include 'include/menu.php'; ?>

    <div class="mouse-cursor cursor-outer"></div>
    <div class="mouse-cursor cursor-inner"></div>

    <!-- Pagetitle -->
    <section class="mainSlider mainSlider--pagetitle">
        <div class="swiper-container homeSlider">
            <div class="slide-inner bg-image" data-background="images/pagetitle-calculator.png">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <div class="slideContent slideOne">
                                <h2>mortgage calculator</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="mortgagePage">
        <div class="container vk-mortgage-calculator">
            <div class="row">
                <div class="col-md-4">
                    <div class="form motgageForm">
                        <form id="prices">
                            <div class="">
                                <label>Home Price</label>
                                <input type="text" id="homePrice" data-type="currency" name="homePrice" 
                                />
                                    <!-- value="350000" /> -->
                            </div>
                            <div class="">
                                <label>Down Payment</label>
                                <input type="text" id="downPayment" name="downPayment" data-type="currency"
                                />    
                                <!-- value="70000" /> -->
                            </div>
                            <div class="">
                                <label>Loan Amount</label>
                                <input type="text" id="loanAmount" name="loanAmount" data-type="currency"
                                />    
                                <!-- value="280000" /> -->
                            </div>
                            <div class="">
                                <label>Interest Rate</label>
                                <input type="number" min="0.125" step="0.125" id="interestRate" name="interestRate"
                                />    
                                <!-- value="4.5" /> -->
                            </div>
                            <div class=" ">
                                <label>Loan Term</label>
                                <select id="LoanTerm" name="LoanTerm" />
                                <option value="0" disabled>Please select one</option>
                                <option value="10">10 years</option>
                                <option value="15"> 15 years</option>
                                <option value="20"> 20 years</option>
                                <option value="30"> 30 years</option>

                                </select>
                            </div>
                            <div class="">
                                <label>Property Tax</label>
                                <input type="number" min="0" step="0.01" id="propertyTax" name="propertyTax" 
                                />
                                <!-- value="1.25"/> -->
                            </div>
                            <div class="">
                                <label>Homeowners Insurance</label>
                                <input type="text" data-type="currency" id="homeownersInsurence" name="homeownersInsurence" 
                                />
                                <!-- value="1225.00" /> -->
                            </div>
                            <div class="">
                                <label>HOA Dues Per Month</label>
                                <input type="text" data-type="currency" id="hoaDues" name="hoaDues" 
                                />
                                <!-- value="50" /> -->
                            </div>
                            <div class="">
                                <label>Private Mortgage Insurance Per Month</label>
                                <input type="text" data-type="currency" id="pmi" name="pmi" 
                                />
                                <!-- value="0" /> -->
                            </div>
                            <div class="">
                                <label>Extra Payment Per Month</label>
                                <input type="text" data-type="currency" id="extraPayment" name="extraPayment" 
                                />
                                <!-- value="0" /> -->
                            </div>
                            <!--
                                <div class="">
                                    <label>Email</label>
                                    <input type="text"  value="" id="mortage_email" name="mortage_email" />
                                </div>
                            -->

                            <!-- Remove get quote or make this fix it is taking all the default data -->
                            <!-- <div class="form-action"> -->
                                <!-- data-link="/quote/" id="getQuote" name="getQuote" -->
                                <!-- <button class="themeBtn border-0"> -->
                                    <!-- Get A Quote -->
                                <!-- </button> -->
                            <!-- </div> -->
                        </form>
                    </div>
                </div>
                <div class="col-md-5">
                    <div id="chart" class="paymentCircle">
                        <h4 class="sectionHeading">Payment Breakdown</h4>
                        <div class="relative-graph circlePayment">
                            <div id="graph">
                                <canvas id="myChart"></canvas>
                            </div>
                            <div class="absolute-center text-center">
                                <p class="line-1">Your Payment</p>
                                <p class="line-2">$0</p>
                                <p class="line-3">per month</p>
                            </div>
                        </div>
                        <div class="row text-center loanAmount">
                            <div class="col-12">
                                <div class="loanAmount">
                                    <ul>
                                        <li>
                                            <label>Total Loan Amount</label>
                                            <span id="totalLoanAmount">$0.00</span>
                                        </li>
                                        <li>
                                            <label>Total Interest Paid</label>
                                            <span id="totalInterestPaid">$0.00</span>
                                        </li>
                                        <li>
                                            <label>All Payment</label>
                                            <span id="allPayment">$0.00</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="principleLst">
                            <ul>
                                <li>
                                    <div>
                                        <span> Principle & Interest </span>
                                        <h6 id="principle">$0.00</h6>
                                    </div>
                                    <div>
                                        <span class="greBg"> HOA Dues </span>
                                        <h6 id="HOADuesSpan">$0.00</h6>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span> Texas </span>
                                        <h6 id="TaxesSpan">$0.00</h6>
                                    </div>
                                    <div>
                                        <span> PMI </span>
                                        <h6 id="pmiSpan">$0.00</h6>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span class="greBg">Insurance </span>
                                        <h6 id="homeownersInsurenceSpan">$0.00</h6>
                                    </div>
                                    <div>
                                        <span> Extra Payment </span>
                                        <h6 id="extraPaymentSpan">$0.00</h6>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="payoff">
                        <h4 class="mb-3 text-center">Early Payoff Strategy</h4>
                        <div class="shadow-lg p-2 mb-5 bg-white rounded text-center frequency">
                            <h5>Increase Frequency</h5>
                            <div id="sliderIncreaseFreq"></div>
                        </div>

                        <div class="shadow-lg p-2 mb-5 bg-white rounded text-center monthly">
                            <h5>Additional Monthly</h5>
                            <p>Excess amount to be added to monthly payments?</p>
                            <span class="valueExcess">$0</span>
                            <div id="sliderAdditionalMth"></div>
                        </div>

                        <div class="shadow-lg p-2 mb-5 bg-white rounded text-center cashbomb">
                            <h5>Lump Sum Payment</h5>
                            <p>Lump sum and frequency to add to your payments?</p>
                            <span class="valueCashBomb">$0</span>
                            <div class="slider">
                                <div id="sliderCashbombAmt"></div>
                            </div>
                            <div class="slider">
                                <div id="sliderCashbombPer"></div>
                            </div>
                        </div>
                        <div class="loanAmount payBox">
                            <ul>
                                <li>
                                    <label>Payment Amount</label>
                                    <!-- <span id="paymentAmount">$1,935.39</span> -->
                                    <span id="paymentAmount">$0</span>
                                </li>
                                <li>
                                    <label>Savings</label>
                                    <span id="savings">$0</span>
                                </li>
                                <li>
                                    <label>Pay Off This Much Sooner</label>
                                    <span id="payOff"></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- <section class="calculatorSec">
        <div class="container">
            <h2 class="heading">Mortgage Calculator</h2>
            <div class="row">
                <div class="col-md-8">
                    <form class="calculatorForm">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Sales Price</label>
                                    <input type="text" class="form-control" placeholder="$0">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Loan Amount</label>
                                    <input type="text" class="form-control" placeholder="$0.00">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Down Payment</label>
                                    <input type="text" class="form-control" placeholder="0%">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Term in Years</label>
                                    <input type="text" class="form-control" placeholder="0">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Market Interest Rate</label>
                                    <input type="text" class="form-control" placeholder="0%">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Monthly Payment</label>
                                    <input type="text" class="form-control" placeholder="$0">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="accordion" id="accordionExample">
                                    <div class="card">
                                        <div class="card-header" id="headingOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            <input type="checkbox" id="advance">
                                            <label for="advance">advanced option</label>
                                        </div>
                                        <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label>Annual Property Taxes</label>
                                                            <input type="text" class="form-control">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label>Annual Homeowners Insurance</label>
                                                            <input type="text" class="form-control">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 mt-3">
                                <button class="themeBtn">Reset</button>
                            </div>
                        </div>
                    </form>
                    <div class="newsletter">
                        <h5>Subscribe to our Mortgage Newsletter</h5>
                        <form action="" class="newsletter__form">
                            <input type="email" placeholder="info@yourmail.com">
                            <button><i class="fab fa-telegram-plane"></i></button>
                        </form>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="calculatorSec__chart">
                        <h2 class="subHeading text-center">Payment Breakdown</h2>
                        <div class="col-md-9 mx-auto">
                            <canvas id="myChart" width="100%"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section> -->

    <?php include 'include/footer.php'; ?>