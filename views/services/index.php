<h1 class="page-name">Services</h1>
<p class="page-description">Services administration</p>

<?php
include_once __DIR__ . '/../templates/bar.php';
?>

<ul class="services">
    <?php foreach ($services as $service) : ?>

        <li>
            <p>Name: <span><?php echo $service->name ?></span></p>
            <p>Price: <span><?php echo $service->price ?></span></p>
        </li>
        <div class="actions">
            <a class="button" href="/services/update?id=<?php echo $service->id ?>">Update</a>
            <form action="/services/delete" method="POST">
                <input type="hidden" name="id" value="<?php echo $service->id ?>">
                <input class="delete-button" type="submit" value="Delete">
            </form>
        </div>

    <?php endforeach; ?>
</ul>