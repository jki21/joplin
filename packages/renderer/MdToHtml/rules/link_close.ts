// This rule is used to add a media player for certain resource types below
// the link.

import { RuleOptions } from '../../MdToHtml';
import renderMedia from '../renderMedia';

function plugin(markdownIt: any, ruleOptions: RuleOptions) {
	const defaultRender = markdownIt.renderer.rules.link_close || function(tokens: any, idx: any, options: any, _env: any, self: any) {
		return self.renderToken(tokens, idx, options);
	};

	markdownIt.renderer.rules.link_close = function(tokens: any[], idx: number, options: any, env: any, self: any) {
		const defaultOutput = defaultRender(tokens, idx, options, env, self);
		const link = ruleOptions.context.currentLinks.pop();

		if (!link || ruleOptions.linkRenderingType === 2 || ruleOptions.plainResourceRendering) return defaultOutput;

		return [defaultOutput, renderMedia(link)].join('');
	};
}

export default { plugin };
