package tool;

import processing.core.PApplet;

public abstract class Shape{
	/**
	 * 
	 */
	public int x;
	public int y;
	public int sx;
	public int sy;

	public int color;
	public int switchColor;

	PApplet parent;
	
	public Shape(PApplet p) {
		parent = p;
		
		x = (int)parent.random(0, parent.getWidth());
		y = (int)parent.random(0, parent.getHeight());
		sx = (int)parent.random(0, parent.getWidth() / 4);
		sy = (int)parent.random(0, parent.getHeight() / 4);

		color = parent.color(255, 255, 255);

		switchColor = parent.color((int)parent.random(0, 255),
							 (int)parent.random(0, 255),
							 (int)parent.random(0, 255));
	}
	
	public boolean isInside() {
		if (parent.mouseX > (x - sx) && parent.mouseX < (x + sx) &&
			parent.mouseY > (y - sy) && parent.mouseY < (y + sy)) {
			return true;
		}
		return false;
	}
	public abstract void drawShape();
}
