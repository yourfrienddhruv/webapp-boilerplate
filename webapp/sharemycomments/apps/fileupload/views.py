from sharemycomments.apps.fileupload.forms import UploadFileForm, NameForm

from sharemycomments.utils import json_response

@json_response
def upload_file(request):

    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            handle_uploaded_file(request.FILES['file'])
            return {"success":"true"}
        else:
             return {"status" : 503, "error": form.errors}
    return {"status" : 501,  "fail":"true"}

@json_response
def submit_form(request):
    if request.method == 'POST':
        form= NameForm(request.POST)
        if form.is_valid():
            return {"success":"true"}
    return {"status" : 501,  "fail":"true"}


def handle_uploaded_file(f):
    print ("something %s",f.name)
    with open('uploadedFiles/'+f.name, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)