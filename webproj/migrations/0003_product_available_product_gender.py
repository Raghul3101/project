# Generated by Django 5.0 on 2023-12-26 15:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webproj', '0002_product_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='available',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='product',
            name='gender',
            field=models.CharField(default=0, max_length=1),
            preserve_default=False,
        ),
    ]
