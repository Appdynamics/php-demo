<?php $view->extend('BundyShoesBundle::layout.html.php'); ?>

Product Name : <b><?php echo $view->escape($product->getName()); ?></b>

<form action="/cart/addToCart" method="post">
    <input type="hidden" name="productId" value="<?php echo $view->escape($product->getId()); ?>" />
    <input type="submit" value="Add to Cart" />
</form>