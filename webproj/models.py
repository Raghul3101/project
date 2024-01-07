from django.db import models

# Create your models here.

class product(models.Model):
    pid = models.CharField(max_length = 20)
    name = models.CharField(max_length = 50)
    img = models.ImageField(upload_to='pics')
    price = models.IntegerField()
    brand = models.CharField(max_length = 30)
    size = models.CharField(max_length = 25)
    gender = models.CharField(max_length = 1)
    available = models.BooleanField(default=True)

