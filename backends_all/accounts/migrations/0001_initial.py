# Generated by Django 5.0.3 on 2024-03-06 06:07

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("user_id", models.CharField(max_length=20, unique=True)),
                ("password", models.CharField(max_length=20)),
                ("nickname", models.CharField(max_length=50)),
                ("comment", models.CharField(blank=True, max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="Group",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100, unique=True)),
                ("description", models.TextField(blank=True)),
                (
                    "members",
                    models.ManyToManyField(
                        blank=True, related_name="groups", to="accounts.user"
                    ),
                ),
            ],
        ),
    ]