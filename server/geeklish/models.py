from django.db import models

class Dictionary(models.Model):
	date = models.DateField(auto_now_add=True)

class PronounDic(Dictionary):
	base = models.CharField(max_length=50)
	a = models.CharField(max_length=50, blank=True)
	p = models.CharField(max_length=50, blank=True)
	pp = models.CharField(max_length=50, blank=True)
	r = models.CharField(max_length=50, blank=True)
	person = models.IntegerField(null=True)
	number = models.CharField(max_length=50, blank=True)

class NounDic(Dictionary):
	base = models.CharField(max_length=50)
	type = models.CharField(max_length=50)
	plural = models.CharField(max_length=50, blank=True)

class DeterminerDic(Dictionary):
	base = models.CharField(max_length=50)
	number = models.CharField(max_length=50)
	independent = models.CharField(max_length=50)

class VerbDic(Dictionary):
	base = models.CharField(max_length=50)
	tps = models.CharField(max_length=50)
	past = models.CharField(max_length=50)
	passive = models.CharField(max_length=50, blank=True)
	gerund = models.CharField(max_length=50)

class AdjectiveDic(Dictionary):
	base = models.CharField(max_length=50)
	comparative = models.CharField(max_length=50, blank=True)
	superlative = models.CharField(max_length=50, blank=True)

class AdverbDic(Dictionary):
	base = models.CharField(max_length=50)

class ConjunctionDic(Dictionary):
	base = models.CharField(max_length=50)
	type = models.CharField(max_length=50)

class PrepositionDic(Dictionary):
	base = models.CharField(max_length=50)

class InfinitiveDic(Dictionary):
	base = models.CharField(max_length=50)

class BeDic(Dictionary):
	base = models.CharField(max_length=50)

class ClauseDic(Dictionary):
	base = models.CharField(max_length=50)

class NounContainerDic(Dictionary):
	base = models.CharField(max_length=50)

class NounClauseDic(Dictionary):
	base = models.CharField(max_length=50)

class AdjectiveClauseDic(Dictionary):
	base = models.CharField(max_length=50)

class ClauseContainerDic(Dictionary):
	base = models.CharField(max_length=50)

class VerbContainerDic(Dictionary):
	base = models.CharField(max_length=50)
