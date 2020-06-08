// experimentCode, experimentParameters

function showPromptIfNeeded() {
    return new Promise.resolve()
    .then(() => {
        this.config.clear();
        let promptParameters = this.config.get(experimentParameters.experimentName);

        if (promptParameters) {
            if (promptParameters.promptShown) {
                return;
            } else if (experimentParameters.popCoveragePercent !== promptParameters.popCoveragePercent) {
                showPrompIfThresholdIsNotExceeded(experimentParameters, promptParameters);
            }
        }

        showPrompIfThresholdIsNotExceeded(experimentParameters, promptParameters);
    });
}

function showPrompIfThresholdIsNotExceeded(experimentParameters, promptParameters) {
    if (promptParameters) {
        promptParameters.popCoveragePercent = experimentParameters.popCoveragePercent;
    } else {
        promptParameters = Object.assign(
            {}, 
            experimentParameters,
            {
                extensionId: "msjsdiag.vscode-react-native-preview",
                promptShown: false,
            },
        );
    }

    if (experimentParameters.popCoveragePercent > Math.random()) {
        const buttonText = "Open extension";
        vscode.window.showInformationMessage("PROMPT_TITLES.RNT_PREVIEW_PROMPT", buttonText)
            .then(selection => {
                if (selection === buttonText && promptParameters) {
                    vscode.commands.executeCommand("workbench.extensions.search", promptParameters.extensionId);
                    vscode.commands.executeCommand("extension.open", promptParameters.extensionId);
                }
            });

        promptParameters.promptShown = true;
    } else {
        promptParameters.promptShown = false;
    }

    return {
        resultCode: 1,
        updatedExperimentParameters: promptParameters,
    };
}

showPromptIfNeeded();