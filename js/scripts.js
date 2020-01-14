// Load json data before creating Directory instance to create Person Classes.
async function loadDirectory() { 
  try{
    const json = await Directory.loadData();
    const results = await json.results;
    const directory = await new Directory(results);
    directory.displayPage();
  } catch(error) {
    Directory.notifyUserOfError(error);
  }
}

loadDirectory();
