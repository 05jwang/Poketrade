# Generated by Django 5.1.7 on 2025-04-01 21:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0002_pack_packitem'),
    ]

    operations = [
        migrations.AddField(
            model_name='pack',
            name='color',
            field=models.CharField(default='#4A5568', help_text='Hex color code for UI display', max_length=7),
        ),
    ]
