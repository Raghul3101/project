# Generated by Django 5.0 on 2023-12-26 15:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webproj', '0003_product_available_product_gender'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='available',
            field=models.BooleanField(default=True),
        ),
    ]
