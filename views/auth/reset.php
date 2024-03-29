<h1 class="page-name">Reset your password</h1>
<p class="page-description">Write your new password in the following form</p>

<?php include_once __DIR__ . '/../templates/alerts.php' ?>
<?php if ($error) { return; } ?>

<form method="post" class="form">
    <div class="field">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" placeholder="Your new password">
    </div>

    <input class="button" type="submit" value="Reset password">
</form>

<div class="actions">
    <a href="/">Already have an account?, log in</a>
    <a href="/create-account">Don't have an account yet?, Create one</a>
</div>