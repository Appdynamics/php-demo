<?php
    $eum_enabled = $view->container->parameters["config"]["eum_enabled"];
    $eum_key = $view->container->parameters["config"]["eum_key"];
?>
<html>
    <head>
<?php if ($eum_enabled) { ?>
        <script>
            window["adrum-app-key"] = "<?php echo $eum_key; ?>";
            window['adrum-start-time'] = new Date().getTime();
        </script>
        <script src="/js/adrum.js"></script>
<?php    } ?> 
      <link href='http://fonts.googleapis.com/css?family=Merriweather:400,900,300,700' rel='stylesheet' type='text/css'>
      <link rel="stylesheet" href="/css/main.css"/>
    </head>
    <body>
        <div id="main">
            <img src="/images/bundy.jpeg" alt="Al Bundy - Founder" id="heroImage" />
            <a id="logo" href="/"><span>Bundy</span> Online Shoes</a>
            <form id="searchBar">Search : <input type="text" name="term" /><input type="submit" value="Search!" /></form>
            <div id="nav">
                <a href="/" id="home">Home</a>
                <a href="/cart" id="cart">View Cart</a>
                <a href="/product/search" id="search">Search</a>
            </div>
            <div id="content">
                <?php $view['slots']->output('_content'); ?>
            </div>
        </div>
        <script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
        <script src="/js/main.js"></script>
    </body>
</html>
