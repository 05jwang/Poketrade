# Generated by Django 5.1.7 on 2025-04-13 04:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_ownedcards'),
    ]

    operations = [
        migrations.RenameField(
            model_name='ownedcards',
            old_name='card',
            new_name='card_info',
        ),
    ]
