from django.db import models
from django.core.validators import int_list_validator

class Histogram(models.Model):
    id = models.PositiveBigIntegerField(primary_key=True)
    data = models.TextField(validators=[int_list_validator]) 
    nbins = models.PositiveBigIntegerField()
