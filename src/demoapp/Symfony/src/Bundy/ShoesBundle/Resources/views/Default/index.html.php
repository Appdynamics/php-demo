<!-- src/AppD/StoreBundle/Resources/views/layout.html.php -->
<?php $view->extend('BundyShoesBundle::layout.html.php') ?>
<div ng-app="bundy" id="ngApp" ng-controller="IndexCtrl">
    Hello <?php echo $view->escape($name); ?>!

    <p>Products</p>
    <ul>
        <?php foreach($products as $product) { ?>
        <li><a href="/product/<?php echo $view->escape($product->getId()); ?>"><?php echo $view->escape($product->getName()); ?></a></li>
        <?php } ?>
    </ul>
    <p>Popular Product</p>
    <div><a href="/product/{{popularProduct.id}}">{{popularProduct.name}}</a></div>
    <iframe src="/heroAd.html">
    </iframe>
</div>
<script>
    var ran = Math.random();
    if (ran < .26) {
      getProductInfo();
    }
</script>