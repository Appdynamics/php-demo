<?php $view->extend('BundyShoesBundle::layout.html.php'); ?>

<p>Products</p>
<ul>
    <?php foreach($products as $product) { ?>
    <li><a href="/product/<?php echo $view->escape($product->getId()); ?>"><?php echo $view->escape($product->getName()); ?></a></li>
    <?php } ?>
</ul>