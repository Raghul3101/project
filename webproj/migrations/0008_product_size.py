# Generated by Django 5.0 on 2023-12-30 16:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webproj', '0007_product_available'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='size',
            field=models.CharField(default=0, max_length=25),
            preserve_default=False,
        ),
    ]