<?php $view->extend('BundyShoesBundle::layout.html.php'); ?>

<h3>Your Cart</h3>
<ul>
<?php foreach ($items as $item) { ?>
    <li><?php echo $view->escape($item->getProduct()->getName()); ?></li>
<?php } ?>
</ul>
<a href="/cart/checkout">Checkout</a>