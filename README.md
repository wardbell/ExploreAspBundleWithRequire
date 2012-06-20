# Explore VS 2012 ASP script bundling with require.js #

This solution explores the use of VS 2012 ASP script bundling when applied to JavaScript files that rely on [**require.js**](http://requirejs.org/) for modularity.

It demonstrates *one* way (not necessarily *the* way) to optimize loading of many AMD/require.js scripts by bundling them into a single downloaded script.

We are not using *r.js* to bundle these modules. That would be the typical *require.js* approach. But it requires installation of *node.js* and we haven't had much luck making it work. That's probably our fault ... although the complexities and opportunities for failure seem daunting.

On the other hand, ASP bundling, a new feature of VS 2012 ASP, is easy to use both during development (no bundling) and for deployment (bundled). Check out [Howard Dierking's article](http://codebetter.com/howarddierking/2012/06/04/web-optimization-in-visual-studio-2012-rc/) for an overview of ASP bundling. 

The experiment embodied in this sample suggests that ASP bundling will meet our application needs for low friction optimization of AMD-style scripts.

As always, your mileage may vary.

## Try it ##

1. Build the solution (it will take longer the first time as NuGet acquires the packages over the web).
2. Run *without* debugging [Ctrl F5]
3. Confirm with browser tools [F12] that it ran cleanly
4. Examine the HTML (from *index.cshtml*) in the browser tools. Note the *jQuery* and *app* script bundles near the bottom of the file. The app bundle import looks something like: 
*&lt;script src="/bundles/app?v=KK1J9Q77QJ5eIyNjIU7Ar9bGcHjk-M5gwsxLDmBQdIE1" type="text/javascript">&lt;/script>*

5. Examine the app?v=... in the browser tools (use "pretty print" to format it). Notice how it is bundled and somewhat minified.

## The app module scripts ##
The application scripts are in "Scripts/app". Each script follows the same pattern. It consists of a single *define* method call with three parameters:

1. The name of the module (e.g., "presenter")
2. An array of names of the modules on which it depends (e.g., "['presenter', 'c']").
3. A function that defines the module. The parameters of this function correspond to the dependencies. The function returns an object.

This is standard *require.js* module definition practice except for step #1, the module name. Normally you omit the name parameter and let *require.js* define it based on the script's file name. 

But after bundling, the files will be combined into a single file (e.g., "app?v=..."). The require.js would not be able to find the files that correspond to the modules. 

We relieve *require.js* of the necessity of loading files and correlating file names to module names by (a) specifying the module names explicitly and (b) playing the bundled script *before* invoking any application module function. 

We won't be using require's async loading feature (the 'A' in "AMD") but we'll still benefit from its dependency management. For example, we won't have to worry about listing the scripts in a particular order.

When you tour the app scripts (which are deliberately simple ... usually only a few lines), you'll see a variety of dependency patterns. Notice that the bundle combines the files in alphabetical order; the application would fail if we weren't using *require* and we played these scripts in alphabetical order; the *presenter* script, for example is needed by all of the scripts that precede it.

Look at "script-D.js" which is defined as the "d" module, thus demonstrating that the module name does not have to match the file name.

## main.js ##
The *main.js* script configures *require.js* for this application and kicks off the application by calling "a.show()".

If you are familiar with *require*, you might have expected main.js to be referenced in the "data-main" attribute of the &lt;script> tag that invokes *require.js*.

That wouldn't work here; we can't allow require to invoke *main.js* until after the bundled script has been played.

## Circular dependencies ##
There are no circular dependencies in this example solution. We try to avoid them in our applications but they can be necessary and require.js has a procedure for tolerating circular dependencies. 

I don't believe they would present a problem in our approach to bundling of AMD/require.js modules but the proof of that lies in the future.

## Incorporating non-AMD scripts ##
Application scripts can depend upon 3rd party libraries that do not conform to AMD/require.js.

Require.js has a "shim" configuration to cope with such dependencies. This example does not yet have an example of a shimmed library ... as it should.

## Revert to unbundled ##

The ASP bundler activates when (a) the build is not the DEBUG build and (b) the debug attribute in the &lt;compilation> directive in **web.config** is "true".

In this example, as downloaded from GitHub, the debug attribute in the &lt;compilation> directive would be "false", assuming it behaves as described above.

Set the attribute to "true", re-build, re-run, and examine the HTLM again. This time, the individual JavaScript files should be loaded individually.

## BundleConfig.cs ##
The **BundleConfig** class in **App_Start** describes the bundles in this application. Most of these are straight from the ASP MVC Basic template (I deleted some of the large jQuery libraries).

At the top is the "app" bundle, defined as:

>bundles.Add(new ScriptBundle("~/bundles/app").Include("~/Scripts/app/*.js"));

*Every* ".js" file in the "Scripts/app" goes into the "app" bundle.

The *require.js* and *main.js* scripts are **not** held apart from the bundle. The *require.js* script must run *before* the application module scripts in the "app" bundle; the *main.js* script that kicks off the application must run *after* the "app" bundle.