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

    <section class="calculatorSec">
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
    </section>

    <?php include 'include/footer.php'; ?>