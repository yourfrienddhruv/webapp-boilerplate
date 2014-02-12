from django import forms

class UploadFileForm(forms.Form):
    file  = forms.FileField()

class NameForm(forms.Form):
    firstName = forms.CharField()
    lastName = forms.CharField()