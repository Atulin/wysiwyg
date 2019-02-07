# WYSIWYG editor

I was looking for a good editor for my CMS/blog/thing for quite some time. I tried TinyMCE, CKEditor, and many, many more.

None happened to suit my needs. They were all either unnecessarily heavy, too complex to set up properly (hello TinyMCE and 200 lines of config!), or looked like they were made in 1995.

So I took it upon myself to use my close-to-nonexistent Javascript skills, some SASS, some HTML and make something of my own, based on ``contenteditable`` div.

And here it is, the result of an evening and a half of work.Open source under [LGPL 3.0](README.md) license.

#[DEMO HERE](https://atulin.github.io/wysiwyg/)

___

### Functionality included:

* Insert ``<h2>`` heading
* *Italics*, **Bold**, ~~Strikethrough~~, Underline (no MD for that apparently ¯\\\_(ツ)_/¯)
* Unordered and Ordered lists
* YouTube embed by URL
* Image embed by URL
* Gfycat embed by URL
* Horizontal line ``<hr>``
* Formatting clear

## File sizes

* ``editor.min.css`` 1.17 KB
* ``editor.min.js`` 4.59 KB (could probably be optimized a lil' bit more)
* ``snippet.htm`` 974 B
* **Total:** 6.73 KB