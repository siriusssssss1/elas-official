# Generated by Django 4.2.1 on 2023-05-05 18:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Lecture",
            fields=[
                (
                    "id",
                    models.CharField(max_length=255, primary_key=True, serialize=False),
                ),
                ("url", models.CharField(max_length=255)),
                ("name", models.CharField(max_length=255)),
                ("subject_type", models.CharField(max_length=255)),
                ("semester", models.CharField(max_length=255)),
                ("sws", models.CharField(max_length=255)),
                ("longtext", models.CharField(max_length=255)),
                ("shorttext", models.CharField(max_length=255)),
                ("language", models.CharField(max_length=255)),
                ("hyperlink", models.CharField(max_length=255)),
                ("description", models.CharField(max_length=255)),
                ("keywords", models.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name="Professor",
            fields=[
                (
                    "id",
                    models.CharField(max_length=255, primary_key=True, serialize=False),
                ),
                ("name", models.CharField(max_length=255)),
                ("url", models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name="StudyProgram",
            fields=[
                (
                    "id",
                    models.CharField(max_length=255, primary_key=True, serialize=False),
                ),
                ("name", models.CharField(max_length=255)),
                ("url", models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name="Timetable",
            fields=[
                (
                    "id",
                    models.CharField(max_length=255, primary_key=True, serialize=False),
                ),
                ("day", models.CharField(max_length=255)),
                ("time_from", models.CharField(max_length=255)),
                ("time_to", models.CharField(max_length=255)),
                ("rhythm", models.CharField(max_length=255)),
                ("duration", models.CharField(max_length=255)),
                ("duration_from", models.DateField()),
                ("duration_to", models.DateField()),
                ("room", models.CharField(max_length=255)),
                ("status", models.CharField(max_length=255)),
                ("comment", models.CharField(max_length=255)),
                ("elearn", models.CharField(max_length=255)),
                ("link", models.CharField(max_length=255)),
                ("dates", models.JSONField()),
                (
                    "lecture",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="studycompass.lecture",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Lecture_StudyProgram",
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
                (
                    "lecture",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="studycompass.lecture",
                    ),
                ),
                (
                    "studyprogram",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="studycompass.studyprogram",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="lecture",
            name="professors",
            field=models.ManyToManyField(to="studycompass.professor"),
        ),
        migrations.AddField(
            model_name="lecture",
            name="root_id",
            field=models.ManyToManyField(
                related_name="lectures",
                through="studycompass.Lecture_StudyProgram",
                to="studycompass.studyprogram",
            ),
        ),
        migrations.AddField(
            model_name="lecture",
            name="timetables",
            field=models.ManyToManyField(
                related_name="lectures", to="studycompass.timetable"
            ),
        ),
    ]
