# Generated by Django 3.2.12 on 2022-03-28 19:54

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Histogram',
            fields=[
                ('id', models.PositiveBigIntegerField(primary_key=True, serialize=False)),
                ('data', models.TextField(validators=[django.core.validators.int_list_validator])),
                ('nbins', models.PositiveBigIntegerField()),
            ],
        ),
    ]