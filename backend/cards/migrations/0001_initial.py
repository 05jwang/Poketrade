# Generated by Django 5.1.7 on 2025-03-26 19:58

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Card',
            fields=[
                ('id', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('supertype', models.CharField(max_length=255)),
                ('subtypes', models.JSONField()),
                ('hp', models.CharField(blank=True, max_length=10, null=True)),
                ('types', models.JSONField(blank=True, null=True)),
                ('evolves_from', models.CharField(blank=True, max_length=255, null=True)),
                ('abilities', models.JSONField(blank=True, null=True)),
                ('attacks', models.JSONField(blank=True, null=True)),
                ('weaknesses', models.JSONField(blank=True, null=True)),
                ('resistances', models.JSONField(blank=True, null=True)),
                ('set_data', models.JSONField()),
                ('number', models.CharField(max_length=10)),
                ('rarity', models.CharField(blank=True, max_length=255, null=True)),
                ('legalities', models.JSONField(blank=True, null=True)),
                ('artist', models.CharField(blank=True, max_length=255, null=True)),
                ('image_url', models.URLField(max_length=1024)),
                ('tcgplayer_url', models.URLField(blank=True, max_length=1024, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Owns',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(default=1)),
                ('card', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cards.card')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
